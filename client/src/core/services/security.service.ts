import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable()
export class SecurityService {
  private headers: HttpHeaders;
  private storage: StorageService;
  private authenticationSource = new Subject<boolean>();
  authenticationChallenge$ = this.authenticationSource.asObservable();
  private authorityUrl = '';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private route: ActivatedRoute,
    private _storageService: StorageService
  ) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.storage = _storageService;

    if (this.storage.retrieve('IsAuthorized') !== '') {
      this.IsAuthorized = this.storage.retrieve('IsAuthorized');
      this.authenticationSource.next(true);
      this.UserData = this.storage.retrieve('userData');
    }
  }

  public IsAuthorized: boolean = false;

  public GetToken(): any {
    return this.storage.retrieve('authorizationData');
  }

  public ResetAuthorizationData() {
    this.storage.store('authorizationData', '');
    this.storage.store('authorizationDataIdToken', '');
    this.IsAuthorized = false;
    this.storage.store('IsAuthorized', false);
  }

  public UserData: any;

  public async SetAuthorizationData(token: any, id_token: any) {
    if (this.storage.retrieve('authorizationData') !== '') {
      this.storage.store('authorizationData', '');
    }
    this.storage.store('authorizationData', token);
    this.storage.store('authorizationDataIdToken', id_token);
    this.IsAuthorized = true;
    this.storage.store('IsAuthorized', true);

    await this.getUserData()
      .toPromise()
      .then(
        (data) => {
          this.UserData = data;
          this.storage.store('userData', data);
          // emit observable
          this.authenticationSource.next(true);
          window.location.href = location.origin;
        },
        (error) => this.HandleError(error)
      );
  }

  public Authorize() {
    this.ResetAuthorizationData();
    let authorizationUrl =
      (this.authorityUrl ? 'http://localhost:5001' : this.authorityUrl) +
      '/connect/authorize';
    let client_id = 'js';
    let redirect_uri = location.origin + '/';
    let response_type = 'id_token token';
    let scope = 'openid profile';
    let nonce = 'N' + Math.random() + '' + Date.now();
    let state = Date.now() + '' + Math.random();

    this.storage.store('authStateControl', state);
    this.storage.store('authNonce', nonce);

    let url =
      authorizationUrl +
      '?' +
      'response_type=' +
      encodeURI(response_type) +
      '&' +
      'client_id=' +
      encodeURI(client_id) +
      '&' +
      'redirect_uri=' +
      encodeURI(redirect_uri) +
      '&' +
      'scope=' +
      encodeURI(scope) +
      '&' +
      'nonce=' +
      encodeURI(nonce) +
      '&' +
      'state=' +
      encodeURI(state);

    window.location.href = url;
  }

  public async AuthorizedCallback() {
    this.ResetAuthorizationData();

    let hash = window.location.hash.substr(1);
    console.log(hash, 'hash');

    let result: any = hash
      .split('&')
      .reduce(function (result: any, item: string) {
        let parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
      }, {});

    console.log(result, 'result');

    let token = '';
    let id_token = '';
    let authResponseIsValid = false;

    if (!result.error) {
      if (result.state !== this.storage.retrieve('authStateControl')) {
        console.log('AuthorizedCallback incorrect state');
      } else {
        token = result.access_token;
        id_token = result.id_token;

        let dataIdToken: any = this.getDataFromToken(id_token);

        // validate nonce
        if (dataIdToken.nonce !== this.storage.retrieve('authNonce')) {
          console.log('AuthorizedCallback incorrect nonce');
        } else {
          this.storage.store('authNonce', '');
          this.storage.store('authStateControl', '');

          authResponseIsValid = true;
          console.log(
            'AuthorizedCallback state and nonce validated, returning access token'
          );
        }
      }
    }

    if (authResponseIsValid) {
      console.log('SetAuthorizationData');
      await this.SetAuthorizationData(token, id_token);
    }
  }

  public Logoff() {
    let authorizationUrl = this.authorityUrl + '/connect/endsession';
    let id_token_hint = this.storage.retrieve('authorizationDataIdToken');
    let post_logout_redirect_uri = location.origin + '/';

    let url =
      authorizationUrl +
      '?' +
      'id_token_hint=' +
      encodeURI(id_token_hint) +
      '&' +
      'post_logout_redirect_uri=' +
      encodeURI(post_logout_redirect_uri);

    this.ResetAuthorizationData();

    // emit observable
    this.authenticationSource.next(false);
    window.location.href = url;
  }

  public HandleError(error: any) {
    console.log(error);
    if (error.status == 403) {
      this._router.navigate(['/Forbidden']);
    } else if (error.status == 401) {
      // this.ResetAuthorizationData();
      this._router.navigate(['/Unauthorized']);
    }
  }

  private urlBase64Decode(str: string) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }

    return window.atob(output);
  }

  private getDataFromToken(token: any) {
    let data = {};

    if (typeof token !== 'undefined') {
      let encoded = token.split('.')[1];
      data = JSON.parse(this.urlBase64Decode(encoded));
    }

    return data;
  }

  private getUserData = (): Observable<string[]> => {
    if (this.authorityUrl === '') {
      this.authorityUrl = this.storage.retrieve('IdentityUrl');
    }

    const options = this.setHeaders();

    return this._http
      .get<string[]>(`${this.authorityUrl}/connect/userinfo`, options)
      .pipe<string[]>((info: any) => info);
  };

  private setHeaders(): any {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    httpOptions.headers = httpOptions.headers.set(
      'Content-Type',
      'application/json'
    );
    httpOptions.headers = httpOptions.headers.set('Accept', 'application/json');

    const token = this.GetToken();

    if (token !== '') {
      httpOptions.headers = httpOptions.headers.set(
        'Authorization',
        `Bearer ${token}`
      );
    }

    return httpOptions;
  }
}
