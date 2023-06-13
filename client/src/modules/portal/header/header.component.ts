import { PortalService } from './../portal.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isHome = false;
  public isLogin = localStorage.getItem('token');

  constructor(private router: Router,
      public portalService: PortalService
    ) {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.isHome = true;
          this.isLogin = localStorage.getItem('token');
        }
        else{
          this.isHome = false;
        }
      }
    });
  }

  ngOnInit(): void {
    console.log(window.location.pathname, 'pathname');
  }
}
