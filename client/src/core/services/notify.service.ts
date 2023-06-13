import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotifyService {
    public pushNotify = new Subject<any>();
    constructor() {
    }
}
