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

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRouting,

        ToastrModule.forRoot({
            maxOpened: 1,
            timeOut: 5000,
            closeButton: false,
            preventDuplicates: true,
            positionClass: 'toast-top-center',
            toastComponent: ToastComponent,
        }),

        // Directives
        DirectivesModule,

        // App modules
        LayoutModule,
    ],
    providers: [
        AuthGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
