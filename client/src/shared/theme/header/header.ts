import { Component, Input } from '@angular/core';
import { PortalService } from 'modules/portal/portal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  @Input()
  url!: string;

  isActiveAdmin: any;

  constructor() {

  }

  ngOnInit(): void {
    this.isActiveAdmin = JSON.parse(localStorage.getItem('status_admin'));
  }

  logout(){
    localStorage.clear();
    window.location.href = "/";
  }
}
