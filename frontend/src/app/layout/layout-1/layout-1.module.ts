import { NgModule } from '@angular/core';
import { Layout1Component } from './layout-1.component';
import { ContentModule } from 'app/layout/components/content/content.module';
import { DirectivesModule } from '../../directives/directives';

@NgModule({
    declarations: [
        Layout1Component,
    ],
    imports: [
        ContentModule,
        DirectivesModule,
    ],
    exports: [
        Layout1Component
    ]
})
export class Layout1Module { }
