import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const pagesRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/pages.module')
            .then(m => m.PagesModule)
    },
];

const routes: Routes = [
    // Applicaiton Pages.
    {
        path: '',
        children: pagesRoutes
    },
    // Not Found Page Redirect Login.
    {
        path: '**',
        redirectTo: 'error/404'
    },
];


@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                useHash: true,
                onSameUrlNavigation: 'reload',
            })],
    exports: [RouterModule]
})

export class AppRouting { }
