import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TweetsMainComponent } from './tweets-main/tweets-main.component';

const routes: Routes = [
    {
        path: '',
        component: TweetsMainComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TweetsRouting { }
