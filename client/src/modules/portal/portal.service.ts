import { Injectable } from '@angular/core';
import { DataService } from 'core/services/data.service';
import { Observable, tap } from 'rxjs';

// import { DataService } from '../shared/services/data.service';
// import { ConfigurationService } from '../shared/services/configuration.service';

@Injectable()
export class PortalService {
  private repipeUrl: string = 'http://127.0.0.1:5000/api/user/';
    constructor(private dataService: DataService) { }

    register(body): Observable<boolean> {
      return this.dataService.post(this.repipeUrl + 'register', body).pipe<boolean>(tap((response: any) => true));
    }

    login(body): Observable<any> {
      return this.dataService.post(this.repipeUrl + 'login', body).pipe<any>(tap((response: any) => true));
    }

    logout() {
      localStorage.clear();
      window.location.href = "/";
    }

    verifyGoogleToken(body): Observable<any> {
      return this.dataService.post(this.repipeUrl + 'verify_google_token', body).pipe<any>(tap((response: any) => true));
    }
    getRoleName(): Observable<any> {
      return this.dataService.get(this.repipeUrl + 'getRoleName').pipe<any[]>(tap((response: any) => {
        return response;
      }));
    }
}
