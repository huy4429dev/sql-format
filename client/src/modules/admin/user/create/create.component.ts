import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  public dataUser: string[];
  public roleValue: string;
  public email: string;
  public password: string;
  public isSuccess: boolean = false;
  public showEmail: boolean = false;

  userForm: FormGroup;
  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private userService: UserService,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
    private router: Router
  ) {
    this.loadingService.isLoading.next(true);
    this.titleService.setTitle("Manager User");
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: [''],
      status: ['0'],
      status_admin: [true]
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
    this.userService.getRoleName()
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
    if (!this.userForm.valid) return;
    this.loadingService.isLoading.next(true);
    const body = {
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value,
      role: this.roleValue ?? this.userForm.get('role').value,
      status: this.userForm.get('status').value,
      status_admin: this.userForm.get('status_admin').value,
    };
    let notify = {};
    this.userService.store(body)
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
              message: 'create recipe success'
            }
            this.isSuccess = true;
            this.showEmail = true;
            this.email = body.email;
            this.password = body.password;
            this.userForm.reset()
            // this.router.navigate(['/admin/user/'])
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
