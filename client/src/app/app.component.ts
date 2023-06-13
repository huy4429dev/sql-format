import { ModalService } from './../core/services/modal.service';
import { NotifyService } from 'core/services/notify.service';
import { LoadingService } from './../core/services/loading.service';
import { Component, OnChanges, SimpleChanges, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnChanges, AfterContentInit {
  title = 'app';
  public loading: boolean = true;
  public notify: any = null;
  constructor(public router: Router,
    public loadingService: LoadingService,
    private notifyService: NotifyService,

  ) {

  }
  ngAfterContentInit(): void {
    this.loadingService.isLoading.next(false);
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.subscribeLoading();
    this.subscribeNotify();
  }

  subscribeLoading() {
    this.loadingService.isLoading.subscribe((status) => {
      this.loading = status;
    });
  }

  subscribeNotify() {
    this.notifyService.pushNotify.subscribe((notify) => {
      if(notify){
        this.notify = notify;
        setTimeout(() => {
          this.notify = null;
          this.notifyService.pushNotify.next(null);
        }, 3000);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
