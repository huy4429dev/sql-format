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
import { TemplateService } from '../template.service';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { BehaviorSubject, Subject, debounceTime, finalize, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-template-history-item',
  templateUrl: './history.component.html',
})
export class HistoryItemComponent implements AfterViewInit, OnDestroy {
  @Input() model: any = null;
  @Output() onClose = new EventEmitter<boolean>();
  private route: Router
  @Output() onOk = new EventEmitter<boolean>();
  templateForm: FormGroup;
  ngSelect= true;
  public isHandling: boolean = false;

  private backDrop = document.querySelector('.modal-backdrop') as HTMLElement;
  data = [];

  private unsubscribe = new Subject();
  private filterInput = new BehaviorSubject<any>({
    page: 1,
    page_size: 10,
    template_id: null,
  });

  constructor(
    private templateService: TemplateService,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
  ) {

  }
  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  config: PaginationInstance = {
    itemsPerPage: 2,
    currentPage: 1,
    totalItems: 0
  };

  p: number = 1;

  ngAfterViewInit(): void {
    this.subsribeFilter();
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
    this.templateService.getHistory(this.model.template_id, this.filterInput.value)
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
            this.config.totalItems = response.pagination.total_records;
            this.config.itemsPerPage = response.pagination.page_size;
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
