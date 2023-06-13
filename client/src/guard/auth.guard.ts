import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticated() && this.hasValidToken()) {
        return true;
    } else {
        this.router.navigate(['/login']);
        return false;
    }
}
  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  hasValidToken(): boolean {
    return true;
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return false;
    }
    return Date.now() < Number(expiration);
  }
}
