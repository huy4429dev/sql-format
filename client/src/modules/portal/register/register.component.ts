import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PortalService } from '../portal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public dataUser: string[];
  public roleValue: string;
  fromGroup: FormGroup;

  constructor(
    private titleService:Title,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
    private fb: FormBuilder,
    private portalService: PortalService,
    private router: Router,
  ) {
    this.titleService.setTitle("Register");
    this.fromGroup = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }
  public saveRoles(e): void {
    let find: any = this.dataUser.find((x: any) => x?.role === e.target.value);
    this.roleValue = find.role;
  }
  ngOnInit(): void {
    this.fetchDataUser();
  }

  fetchDataUser() {
    this.loadingService.isLoading.next(true);
    this.portalService.getRoleName()
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
        })
      )
      .subscribe(
        {
          next: (response) => {
            if (!response) return;
            this.dataUser = response?.data ?? [];
          },
          error: (error: any) => {
            this.notifyService.pushNotify.next({
              type: 'error',
              message: error?.message ?? 'error'
            });
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
      role: ''
    };
    let notify = {};
    this.portalService.register(body)
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
          this.notifyService.pushNotify.next(notify);
        })
      )
      .subscribe(
        {
          next: () => {
            notify = {
              type: 'success',
              message: 'register success'
            }
            this.fromGroup.reset()
            this.router.navigate(['/login'])
          },
          error: (error: any) => {
            notify = {
              type: 'error',
              message: error?.message ?? 'error'
            }
          }
        }
      );
    ;
  }
}
