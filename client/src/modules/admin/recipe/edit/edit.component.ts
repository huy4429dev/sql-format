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
import { RecipeService } from '../recipe.service';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from 'core/services/modal.service';

@Component({
  selector: 'app-recipe-edit-item',
  templateUrl: './edit.component.html',
})
export class EditItemComponent implements OnInit {
  @Input() model: any = null;
  @Output() onClose = new EventEmitter<boolean>();
  private route: Router
  @Output() onOk = new EventEmitter<boolean>();
  recipeForm: FormGroup;
  ngSelect= true;
  public isHandling: boolean = false;

  private backDrop = document.querySelector('.modal-backdrop') as HTMLElement;
  private unsubscribe = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private mainService: RecipeService,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.backDrop.style.display = 'block';
    this.recipeForm = this.fb.group({
      name: [this.model.name, Validators.required],
      description: [this.model.description, Validators.required],
      version: [this.model.version],
      image: [this.model.image],
      enabled: [this.model.enabled]
    });
    this.ngSelect = this.model.enabled;
  }


  handleSubmit() {

    if (!this.recipeForm.valid) return;
    this.loadingService.isLoading.next(true);

    const body = {
      recipe_id: this.model.recipe_id,
      name: this.recipeForm.get('name').value,
      description: this.recipeForm.get('description').value,
      version: this.recipeForm.get('version').value ?? '1.0',
      image: this.recipeForm.get('image').value ?? '',
      enabled: this.recipeForm.get('enabled').value,
      user_id: localStorage.getItem('user_id'),
    };

    let notify = {};

    this.mainService.edit(body)
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
            message: 'update recipe success'
          }
          for (const key in body) {
            this.model[key] = body[key];
          };
          this.model['updated_at'] = (new Date()).toISOString();
          this.onClose.emit(true);
          this.router.navigate(['/admin/recipe/'])
        },
        error: (error: any) => {
          notify = {
            type: 'error',
            message: error?.message ?? 'error'
          }
        },complete: () => {
          this.isHandling = true;
          this.removeValidators();
          this.recipeForm.reset();
          this.closeModal();
        },
      });
  }


  closeModal() {
    this.onClose.emit(true);
  }

  ngOnDestroy(): void {
    this.backDrop.style.display = 'none';
    this.unsubscribe.complete();
    this.unsubscribe.unsubscribe();

  }
  removeValidators() {
    for (const key in this.recipeForm.controls) {
      this.recipeForm.get(key)?.clearValidators();
      this.recipeForm.get(key)?.updateValueAndValidity();
    }
  }
}
