import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const pagesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'signin',
    },
    {
        path: 'signin',
        component: LoginComponent,
    },
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
