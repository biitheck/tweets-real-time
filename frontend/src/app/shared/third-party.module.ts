import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HashtagMentionColLibModule } from 'hashtag-mention-colorizer';
import { VimeModule } from '@vime/angular';

@NgModule({
    imports: [
        VimeModule,
        FlexLayoutModule,
        NgxSkeletonLoaderModule,
        HashtagMentionColLibModule,
    ],
    exports: [
        VimeModule,
        FlexLayoutModule,
        NgxSkeletonLoaderModule,
        HashtagMentionColLibModule,
    ],
    providers: []
})

export class ThirdPartyModule { }
