import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { TweetsRouting } from './tweets.routing';
import { TweetsMainComponent } from './tweets-main/tweets-main.component';

@NgModule({
    declarations: [
        TweetsMainComponent,
    ],
    imports: [
        // Route Module.
        RouterModule,
        // Shared Module.
        SharedModule,
        // Custom Components.
        ComponentsModule,
        // Routing.
        TweetsRouting,
    ]
})
export class TweetsModule { }
