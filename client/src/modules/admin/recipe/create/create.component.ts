import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
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
  editorOptions = { theme: 'vs-dark', language: 'sql' };

  recipeForm: FormGroup;
  constructor(
    private titleService:Title,
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
    private router: Router
  ) {
    this.titleService.setTitle("Create Recipe");
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      version: ['', Validators.required],
      enabled: [true]
    });
  }

  onSubmit() {
    if (!this.recipeForm.valid) return;
    this.loadingService.isLoading.next(true);
    const body = {
      name: this.recipeForm.get('name').value,
      description: this.recipeForm.get('description').value,
      image: this.recipeForm.get('image').value,
      version: this.recipeForm.get('version').value,
      enabled: this.recipeForm.get('enabled').value,
      user_id: localStorage.getItem('user_id'),
    };

    let notify = {};
    this.recipeService.store(body)

      .pipe(
        finalize(() => {
          this.notifyService.pushNotify.next(notify);
        })
      )
      .subscribe(
        {
          next: () => {
            notify = {
              type: 'success',
              message: 'create recipe success'
            };
            this.recipeForm.reset();
            this.router.navigate(['/admin/recipe/'])
          },
          error: (error: any) => {
            notify = {
              type: 'error',
              message: error?.message ?? 'error'
            }
           this.loadingService.isLoading.next(false);
          }
        }
      );
    ;
  }

}
