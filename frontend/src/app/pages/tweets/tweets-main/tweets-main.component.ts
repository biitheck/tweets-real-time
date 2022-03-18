import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from 'angularx-social-login';

@Component({
    selector: 'app-tweets-main',
    templateUrl: './tweets-main.component.html',
    styleUrls: ['./tweets-main.component.scss'],
})
export class TweetsMainComponent implements OnInit, OnDestroy {

    public loading: boolean;
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toasterSrv: ToastrService,
        private authService: SocialAuthService,
    ) {
        this.loading = false;
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    signOut(): void {
        this.authService.signOut();
    }
}
