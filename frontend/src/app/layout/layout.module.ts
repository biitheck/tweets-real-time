import { NgModule } from '@angular/core';
import { Layout1Module } from './layout-1/layout-1.module';

@NgModule({
    imports: [
        Layout1Module,
    ],
    exports: [
        Layout1Module,
    ]
})

export class LayoutModule { }
