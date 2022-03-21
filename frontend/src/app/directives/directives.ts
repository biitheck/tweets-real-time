import { NgModule } from '@angular/core';
import { MyPerfectScrollbarDirective } from './my-perfect-scrollbar/my-perfect-scrollbar.directive';

@NgModule({
    declarations: [
        MyPerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        MyPerfectScrollbarDirective
    ]
})
export class DirectivesModule
{
}
