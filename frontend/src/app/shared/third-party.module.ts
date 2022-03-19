import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HashtagMentionColLibModule } from 'hashtag-mention-colorizer';

@NgModule({
    imports: [
        FlexLayoutModule,
        NgxSkeletonLoaderModule,
        HashtagMentionColLibModule,
    ],
    exports: [
        FlexLayoutModule,
        NgxSkeletonLoaderModule,
        HashtagMentionColLibModule,
    ],
    providers: []
})

export class ThirdPartyModule { }
