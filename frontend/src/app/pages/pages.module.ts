import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from './../shared/shared.module';
import { PagesRouting } from './pages.routing';

@NgModule({
    declarations: [],
    imports: [
        // Routing.
        PagesRouting,
    ]
})
export class PagesModule { }
