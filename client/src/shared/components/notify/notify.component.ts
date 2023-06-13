import { Component, Input, OnChanges } from '@angular/core';
import { NotifyService } from 'core/services/notify.service';

@Component({
    selector: 'app-notify',
    templateUrl: './notify.component.html',
    styleUrls: ['./notify.component.scss']
})
export class NotifyComponent {

  @Input() notify: any;

}
