import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  $checkStep = new BehaviorSubject(false);
  constructor() { }
}
