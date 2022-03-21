import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from './layout/layout.module';
import { AppRouting } from './app.routing';

// Components.
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { ToastComponent } from './components/toast/toast.component';
import { DirectivesModule } from './directives/directives';

// Social Logins packages.
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

// Config.
import * as config from './config/app.config';

// Socket.
import { SocketIoModule } from 'ngx-socket-io';
import { MySocket } from './extensions';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRouting,
        SocialLoginModule,
        ToastrModule.forRoot({
            maxOpened: 1,
            timeOut: 5000,
            closeButton: false,
            preventDuplicates: true,
            positionClass: 'toast-top-center',
            toastComponent: ToastComponent,
        }),

        // SocketIO
        SocketIoModule,

        // Directives
        DirectivesModule,

        // App modules
        LayoutModule,
    ],
    providers: [
        AuthGuard,
        MySocket,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            config.google.clientId,
                        )
                    },
                ]
            } as SocialAuthServiceConfig,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
