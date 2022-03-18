import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private dataSrv: DataService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.ignoreUrl(route)) {
            return true;
        } else if (this.dataSrv.isLoggedIn()) {
            return true;
        } else {
            void this.router.navigate(['signin']);
            return false;
        }
    }

    private ignoreUrl(route: ActivatedRouteSnapshot): boolean {
        return route.pathFromRoot
            .map(v => v.url.map(segment => segment.toString()).join('/'))
            .join('')?.length <= 0;
    }
}
