import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { PagesRouting } from './pages.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        // Shared Module.
        SharedModule,
        // Routing.
        PagesRouting,
    ]
})
export class PagesModule { }
