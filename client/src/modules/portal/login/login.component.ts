import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { finalize } from 'rxjs';
import { PortalService } from '../portal.service';
import { Router } from '@angular/router';
import {
  SocialAuthService, SocialUser,
} from '@abacritt/angularx-social-login';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fromGroup: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(
    private titleService: Title,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
    private fb: FormBuilder,
    private portalService: PortalService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {

    this.titleService.setTitle("Login");
    if (localStorage.getItem('token')) {
      this.router.navigate(['/admin/dashboard'])
    }

    this.fromGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.verifyGoogleToken(this.socialUser.idToken)
    });;
  }

  verifyGoogleToken(token) {
    this.loadingService.isLoading.next(true);
    const body = {
      token
    };
    let notify = {};
    this.portalService.verifyGoogleToken(body)
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
          this.notifyService.pushNotify.next(notify);
        })
      )
      .subscribe(
        {
          next: (data) => {
            if(!data?.token){
              return this.router.navigate(['/']);
            };
            localStorage.setItem('email', data.email);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('status', data.status);
            localStorage.setItem('status_admin', data.status_admin);
            notify = {
              type: 'success',
              message: 'login success'
            }
            this.router.navigate(['/admin/dashboard'])
          },
          error: (error: any) => {
            notify = {
              type: 'error',
              message: error?.message ?? 'error'
            }
          }
        }
      );
  }

  onSubmit() {
    if (!this.fromGroup.valid) return;
    this.loadingService.isLoading.next(true);
    const body = {
      email: this.fromGroup.get('email').value,
      password: this.fromGroup.get('password').value,
    };
    let notify = {};
    this.portalService.login(body)
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
          this.notifyService.pushNotify.next(notify);
        })
      )
      .subscribe(
        {
          next: (data) => {
            if (data) {
              localStorage.setItem('token', data.token);
              localStorage.setItem('user_id', data.id);
              localStorage.setItem('status', data.status);
              localStorage.setItem('status_admin', data.status_admin);
              notify = {
                type: 'success',
                message: 'login success'
              }
              this.router.navigate(['/admin/dashboard'])
            }
          },
          error: (error: any) => {
            notify = {
              type: 'error',
              message: error?.message ?? 'error'
            }
          }
        }
      );
  }
}
