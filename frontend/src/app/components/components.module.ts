import { NgModule } from '@angular/core';

// Angular Material.
import { SharedModule } from 'app/shared/shared.module';

// Components.
import { ToastComponent } from './toast/toast.component';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from './card/card.component';

@NgModule({
    imports: [
        // Shared Modules
        SharedModule,
        MatInputModule,
    ],
    declarations: [
        ToastComponent,
        CardComponent,
    ],
    exports: [
        ToastComponent,
        CardComponent,
        MatInputModule,
    ],
})
export class ComponentsModule { }
