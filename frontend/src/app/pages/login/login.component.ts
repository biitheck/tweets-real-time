import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Targets } from '../../config/app.config';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private toasterSrv: ToastrService,
        private authService: SocialAuthService,
    ) { }

    async ngOnInit(): Promise<void> {
        this.authService
            .authState
            .subscribe(async (user) => {
                const payload  = await this.http
                    .post(`${Targets.SignIn}/login`, { token: user.idToken })
                    .toPromise();
                
                if (payload) { 
                    this.router.navigate(['tweets']);
                }
            });
    }

    signInWithGoogle(): void {
        this.authService
            .signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    refreshToken(): void {
        this.authService
            .refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
