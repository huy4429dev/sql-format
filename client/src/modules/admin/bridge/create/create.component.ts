import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { BridgeService } from '../bridge.service';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { BehaviorSubject, Subject, debounceTime, finalize, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public dataRecipe: string[];
  public dataTemplate: string[];
  public dataBridge: FormGroup;
  public selectedItem: string;
  private filterInput = new BehaviorSubject<any>({
    page: 1,
    page_size: 10,
  });
  private unsubscribe = new Subject();

  bridgeForm: FormGroup;
  constructor(
    private titleService:Title,
    private fb: FormBuilder,
    private bridgeService: BridgeService,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.titleService.setTitle("Create Bridge");
    this.loadingService.isLoading.next(true);
    this.bridgeForm = this.fb.group({
      data: [],
    });
    this.dataBridge = this.formBuilder.group({
      bridge: this.formBuilder.array([]) as FormArray,
      template_ids : this.formBuilder.array([]) as FormArray
    });
  }

  ngOnInit(): void {
      this.fetchDataReicepe();
      this.fetchDataTemplate();
      this.subsribeFilter();
  }
  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  fetchDataReicepe() {
    this.loadingService.isLoading.next(true);
    this.bridgeService.getRecipe()
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
        })
      )
      .subscribe(
        {
          next: (response) => {
            if (!response) return;
            this.dataRecipe = response?.data ?? [];
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

  subsribeFilter() {
    this.filterInput
      .pipe(
        takeUntil(this.unsubscribe),
        tap(() => {
          this.loadingService.isLoading.next(true);
        }),
        debounceTime(500)
      )
      .subscribe(() => {
        this.fetchDataTemplate();
      })
  }
  fetchDataTemplate() {
    this.loadingService.isLoading.next(true);
    this.bridgeService.getTemplate(this.filterInput.value)
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
        })
      )
      .subscribe(
        {
          next: (response) => {
            if (!response) return;
            this.dataTemplate = response?.data ?? [];
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

  onOptionsSelected() {
    console.log();
  }

  filter(key, event) {
    this.filterInput.next({ ... this.filterInput.value, [key]: event.target.value });
  }
  onCheckboxChange(templateId: any, isChecked: boolean) {
    const recipeIndex = this.dataBridge.get('bridge').value.findIndex((recipe: any) => recipe.recipe_id === this.selectedItem);
    if (isChecked) {
      if (recipeIndex > -1) {
        const templateIds = this.dataBridge.get('bridge').value[recipeIndex].template_ids;
        if (typeof templateIds === 'string') {
          this.dataBridge.get('bridge').value[recipeIndex].template_ids = [templateIds];
        }
        if (Array.isArray(templateIds)) {
          templateIds.push(templateId);
        } else {
          this.dataBridge.get('bridge').value[recipeIndex].template_ids = [templateIds, templateId];
        }
      } else {
        (this.dataBridge.get('bridge') as FormArray).push(this.formBuilder.group({
          recipe_id: this.selectedItem,
          template_ids: [[templateId]]
        }));
      }
    } else {
      const templateIds = this.dataBridge.get('bridge').value[recipeIndex].template_ids;
      const index = templateIds.indexOf(templateId);
      if (Array.isArray(templateIds)) {
        templateIds.splice(index, 1);
      }
      if (templateIds.length === 0) {
        (this.dataBridge.get('bridge') as FormArray).removeAt(recipeIndex);
      }
    }
    console.log(this.dataBridge.value.bridge);
  }

  onSubmit() {
    if (!this.bridgeForm.valid) return;
    this.loadingService.isLoading.next(true);
    const body = {
      data: this.dataBridge.value.bridge,
    };
    let notify = {};
    this.bridgeService.store(body)
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
              message: 'create bridge success'
            }
            this.bridgeForm.reset()
            this.router.navigate(['/admin/bridge/'])
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

  isTemplateSelected(templateId: string): boolean {
    const recipeIndex = this.dataBridge.get('bridge').value.findIndex((recipe: any) => recipe.recipe_id === this.selectedItem);
    if (recipeIndex > -1) {
      const templateIds = this.dataBridge.get('bridge').value[recipeIndex].template_ids;
      return Array.isArray(templateIds) && templateIds.includes(templateId);
    }
    return false;
  }


}
