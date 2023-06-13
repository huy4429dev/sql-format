import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessRights implements CanActivate {

  constructor( private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticated()) {
        return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
  }
}
  isAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem('status_admin')) == true;
  }
}
