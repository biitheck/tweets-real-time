import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';

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
        canActivate: [AuthGuard],
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
