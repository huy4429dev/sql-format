import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ModalService {
    public onClose = new Subject<boolean>();
    constructor() {
    }
}
