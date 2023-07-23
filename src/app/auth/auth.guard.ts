import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard {
  constructor(private service: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuth = this.service.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}

export const canActivatePost: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuard).canActivate();
};
