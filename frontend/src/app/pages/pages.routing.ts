import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const pagesRoutes: Routes = [
    {
        path: 'tweets',
        loadChildren: () => import('./tweets/tweets.module')
            .then(m => m.TweetsModule)
    },
    {
        path: 'error',
        loadChildren: () => import('./error/error.module')
            .then(m => m.ErrorModule)
    },
];


@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})

export class PagesRouting { }
