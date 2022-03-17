import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
// import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        //  private authSrv: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (this.authSrv.isLoggedIn()) {
        //     return true;
        // } else {
        //     this.router.navigate(
        //         ['/auth/login'],
        //         {
        //             queryParams: {
        //                 return: state.url
        //             }
        //         });
        //     return false;
        // }

        return true;
    }
}
