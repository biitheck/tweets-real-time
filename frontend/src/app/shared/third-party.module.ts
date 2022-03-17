import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
    imports: [
        FlexLayoutModule,
        NgxSkeletonLoaderModule,
    ],
    exports: [
        FlexLayoutModule,
        NgxSkeletonLoaderModule,
    ],
    providers: []
})

export class ThirdPartyModule { }
