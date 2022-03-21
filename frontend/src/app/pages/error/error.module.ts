import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorRouting } from './error.routing';

@NgModule({
    declarations: [
        NotFoundComponent,
    ],
    imports: [
        // Route Module.
        RouterModule,
        // Shared Module.
        SharedModule,
        // Custom Components.
        ComponentsModule,
        // Routing.
        ErrorRouting,
    ]
})
export class ErrorModule { }
