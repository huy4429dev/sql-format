import { Component, Input, OnChanges } from '@angular/core';
import { NotifyService } from 'core/services/notify.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() notify: any;

}
