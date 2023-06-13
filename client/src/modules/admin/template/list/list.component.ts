import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingService } from 'core/services/loading.service';
import { NotifyService } from 'core/services/notify.service';
import { TemplateService } from 'modules/admin/template/template.service';
import { PaginationInstance } from 'ngx-pagination';
import { Subject, BehaviorSubject, takeUntil, tap, debounceTime, finalize } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isActiveAdmin: any;
  private unsubscribe = new Subject();
  public isCheckAllItem = false;
  public hasItemDelete = false;
  private filterInput = new BehaviorSubject<any>({
    page: 1,
    page_size: 10,
    name: null,
    description: null,
    template_id: null,
  });

  config: PaginationInstance = {
    itemsPerPage: 2,
    currentPage: 1,
    totalItems: 0
  };

  data = [];
  p: number = 1;

  itemHandle = null;

  popupState = {
    isHandling: false,
    edit: false,
    delete: false,
    bulkDelete: false,
    history: false
  };

  constructor(
    private titleService:Title,
    private templateService: TemplateService,
    private loadingService: LoadingService,
    private notifyService: NotifyService,
  ) {

    this.titleService.setTitle("List Template");
    this.loadingService.isLoading.next(true);

  }
  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }


  ngOnInit(): void {
    this.subsribeFilter();
    this.isActiveAdmin = JSON.parse(localStorage.getItem('status')) != 1 && JSON.parse(localStorage.getItem('status')) != 2;
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
        this.fetchData();
        this.isCheckAllItem = false;
        this.hasItemDelete = false;
      })
  }

  sort(key, value) {
    const sort = JSON.stringify({
      [key]: value
    });
    this.filterInput.next({ ... this.filterInput.value, sort });
  }

  checkItem($event: Event, index: number) {
    const checked = ($event.target as HTMLInputElement).checked;
    this.data[index].checked = checked;
    this.setCheckAllItem();
    this.showDeleteBtn();
  }

  checkAllItem($event: Event) {
    const checked = ($event.target as HTMLInputElement).checked;
    checked && (this.isCheckAllItem = true);
    this.data.forEach(item => {
      item.checked = checked;
    });
    this.showDeleteBtn();
  }

  setCheckAllItem(){
    if (this.data.every(item => item.checked)) {
      this.isCheckAllItem = true;
    }
    else {
      this.isCheckAllItem = false;
    }
  }

  showDeleteBtn(){
    if(this.data.some(item => item.checked)){
      this.hasItemDelete = true;
    }
    else {
      this.hasItemDelete = false;
    }
  }
  fetchData() {
    this.resetPopupState();
    this.loadingService.isLoading.next(true);
    this.templateService.getAll(this.filterInput.value)
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

  setPageSize(page_size){
    this.filterInput.next({ ...this.filterInput.value, page_size });
  }

  pageChanged(page) {
    this.filterInput.next({ ...this.filterInput.value, page });
  }

  filter(key, event) {
    this.filterInput.next({ ... this.filterInput.value, [key]: event.target.value });
  }

  handleEdit(item: any) {
    this.itemHandle = item;
    this.resetPopupState();
    this.popupState.edit = true;
  }

  handleDelete(item) {
    this.itemHandle = item;
    this.resetPopupState();
    this.popupState.delete = true;
  }

  handleHistory(item: any) {
    this.itemHandle = item;
    this.resetPopupState();
    this.popupState.history = true;
  }

  okDelete() {
    this.loadingService.isLoading.next(true);
    this.templateService.delete(this.itemHandle.template_id)
      .subscribe(
        {
          next: () => {
            this.fetchData();
          },
          error: (error: any) => {
            this.notifyService.pushNotify.next({
              type: 'error',
              message: error?.message ?? 'error'
            });
            this.loadingService.isLoading.next(false);
          }
        }
      );
  }

  resetPopupState() {
    for (const key in this.popupState) {
      this.popupState[key] = false;
    }
    this.isCheckAllItem = false;
    this.hasItemDelete = false;
  }

  okBulkDelete() {
    this.loadingService.isLoading.next(true);
    this.templateService.bulkDelete(this.data.filter(item => item.checked).map(item => item.template_id))
      .subscribe(
        {
          next: () => {
            this.fetchData();
          },
          error: (error: any) => {
            this.notifyService.pushNotify.next({
              type: 'error',
              message: error?.message ?? 'error'
            });
            this.loadingService.isLoading.next(false);
          }
        }
      );
  }
}
