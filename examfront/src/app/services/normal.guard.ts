import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class NormalGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.login.isLoggedIn() && this.login.getUserRole() === 'NORMAL') {
      return true;
    }

    // Navigate to login if user is not authenticated or not an admin
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }, // Optional: Pass the return URL
    });

    return false;
  }
}