import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
@Component({
  selector: 'app-popup-delete',
  styleUrls: ['./popup-delete.component.scss'],
  templateUrl: './popup-delete.component.html',
})
export class PopupDeleteComponent implements OnChanges, OnDestroy {
  @ViewChild('btnCloseModal')
  btnCloseModal!: ElementRef;

  @Input() isClose: boolean = false;
  @Input() isHandling: boolean = true;
  @Output() onOk = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<boolean>();

  private backDrop = document.querySelector('.modal-backdrop') as HTMLElement;
  constructor() {
    this.backDrop.style.display = 'block';
  }

  ngOnChanges(): void {
    if (this.isClose) {
      this.closeModal();
    }
  }

  handleSave() {
    this.onOk.emit(true);
  }

  closeModal() {
    this.onClose.emit(true);
  }

  ngOnDestroy(): void {
    this.backDrop.style.display = 'none';
  }
}
