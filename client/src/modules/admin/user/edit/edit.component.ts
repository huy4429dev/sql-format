import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit-item',
  templateUrl: './edit.component.html',
})
export class EditItemComponent implements OnInit {
  @Input() model: any = null;
  @Output() onClose = new EventEmitter<boolean>();
  private route: Router
  @Output() onOk = new EventEmitter<boolean>();
  userForm: FormGroup;
  public ngSelectStatus: any = 0;
  public isHandling: boolean = false;
  public dataUser: string[];
  public roleValue: string;
  ngSelectAdminStatus= true;
  private backDrop = document.querySelector('.modal-backdrop') as HTMLElement;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchDataUser();
    this.backDrop.style.display = 'block';

    this.userForm = this.fb.group({
      email: [this.model.email, Validators.required],
      role: [this.model.role],
      status: [this.model.status],
      password: [this.model.password],
      status_admin: [this.model.status_admin],
    });
    this.roleValue = this.model.role;
    this.ngSelectStatus = this.model.status;
    this.ngSelectAdminStatus = this.model.status_admin;
  }

  public saveRoles(e): void {
    let find: any = this.dataUser.find((x: any) => x?.role === e.target.value);
    this.roleValue = find.role;
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

  handleSubmit() {

    if (!this.userForm.valid) return;

    const body = {
      user_id: this.model.user_id,
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value ?? '',
      role: this.userForm.get('role').value ?? 'user',
      status: this.userForm.get('status').value,
      status_admin: this.userForm.get('status_admin').value,
    };

    let notify = {};

    this.userService.edit(body)
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
          this.notifyService.pushNotify.next(notify);
        })
      )
      .subscribe({
        next: () => {
          notify = {
            type: 'success',
            message: 'update user success'
          }
          for (const key in body) {
            this.model[key] = body[key];
          };
          this.onClose.emit(true);
        },
        error: (error: any) => {
          notify = {
            type: 'error',
            message: error?.message ?? 'error'
          }
        }, complete: () => {
          this.isHandling = true;
          this.removeValidators();
          this.userForm.reset();
          this.closeModal();
        },
      });
  }


  closeModal() {
    this.onClose.emit(true);
  }

  ngOnDestroy(): void {
    this.backDrop.style.display = 'none';
  }
  removeValidators() {
    for (const key in this.userForm.controls) {
      this.userForm.get(key)?.clearValidators();
      this.userForm.get(key)?.updateValueAndValidity();
    }
  }
}
