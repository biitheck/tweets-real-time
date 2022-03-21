import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ThirdPartyModule } from './third-party.module';

// Pipes.
import {
    StringFilterByPipe,
    TimeAgoPipe,
} from '../pipes';

@NgModule({
    declarations: [
        StringFilterByPipe,
        TimeAgoPipe,
    ],
    imports: [
        // Base Modules.
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // Angular Material
        MaterialModule,
        // Third Modules
        ThirdPartyModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ThirdPartyModule,
        // Pipes.
        StringFilterByPipe,
        TimeAgoPipe,
    ],
    providers: [
        StringFilterByPipe,
    ],
})

export class SharedModule { }
