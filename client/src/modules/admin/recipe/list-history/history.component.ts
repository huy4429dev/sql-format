import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, debounceTime, finalize, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-recipe-history-item',
  templateUrl: './history.component.html',
})
export class HistoryItemComponent implements OnInit, OnDestroy {
  @Input() model: any = null;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onOk = new EventEmitter<boolean>();
  recipeForm: FormGroup;
  ngSelect= true;
  public isHandling: boolean = false;
  data = [];

  private unsubscribe = new Subject();
  private filterInput = new BehaviorSubject<any>({
    page: 1,
    page_size: 3,
    recipe_id: null,
  });

  constructor(
    private recipeService: RecipeService,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
  ) {

  }

  ngOnInit(): void {
    this.subsribeFilter();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  subsribeFilter() {
    this.filterInput
      .pipe(
        takeUntil(this.unsubscribe),
        tap(() => {
        }),
        debounceTime(500)
      )
      .subscribe(() => {
        this.fetchData();
      })
  }

  fetchData() {
    this.loadingService.isLoading.next(true);
    this.recipeService.getHistory(this.model.recipe_id,this.filterInput.value)
      .pipe(
        finalize(() => {
          this.loadingService.isLoading.next(false);
        })
      )
      .subscribe(
        {
          next: (response) => {
            if (!response) return;
            this.data = response?.data ?? [];
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

  pageChanged(page) {
    console.log(this.filterInput);

    this.filterInput.next({ ...this.filterInput.value, page });
  }

  filter(key, event) {
    this.filterInput.next({ ... this.filterInput.value, [key]: event.target.value });
  }

  closeModal() {
    this.onClose.emit(true);
  }
}
