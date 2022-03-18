import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from 'angularx-social-login';
import { DataService } from '../../../services/data.service';

@Component({
    selector: 'app-tweets-main',
    templateUrl: './tweets-main.component.html',
    styleUrls: ['./tweets-main.component.scss'],
})
export class TweetsMainComponent implements OnInit, OnDestroy {

    public loading: boolean;
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
        private toasterSrv: ToastrService,
        private dataSrv: DataService,
        private authService: SocialAuthService,
    ) {
        this.loading = false;
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    async signOut(): Promise<void> {
        try {
            await this.authService.signOut();
        } finally {
            this.dataSrv.clean();
            void this.router.navigate(['']);
        }
    }
}
