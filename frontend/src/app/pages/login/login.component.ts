import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Targets } from '../../config/app.config';
import { User } from '../../models';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private toasterSrv: ToastrService,
        private dataSrv: DataService,
        private authService: SocialAuthService,
    ) {
        if (this.dataSrv.isLoggedIn()) {
            void this.router.navigate(['tweets']);
        }
    }

    ngOnInit(): void {
        this.authService
            .authState
            .subscribe(async (user) => {
                if (user) {
                    await this.onLogin(user);
                }
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    async signInWithGoogle(): Promise<void> {
        await this.authService
            .signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    async refreshToken(): Promise<void> {
        await this.authService
            .refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    private async onLogin(user: any): Promise<void> {
        const payload = await this.http
            .post<User>(
                `${Targets.SignIn}/login`,
                { token: user.idToken }
            )
            .toPromise();

        if (payload) {
            payload.token = user.idToken;
            this.dataSrv.setUser(payload);
            void this.router.navigate(['tweets']);
        }
    }
}
