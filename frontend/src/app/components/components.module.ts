import { NgModule } from '@angular/core';

// Angular Material.
import { SharedModule } from 'app/shared/shared.module';

// Components.
import { ToastComponent } from './toast/toast.component';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from './card/card.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TweetComponent } from './tweet/tweet.component';
import { HashtagMentionColLibModule } from 'hashtag-mention-colorizer';
import { TweetLoaderComponent } from './tweet-loader/tweet-loader.component';

@NgModule({
    imports: [
        // Shared Modules
        SharedModule,
        HashtagMentionColLibModule,
        MatInputModule,
    ],
    declarations: [
        ToastComponent,
        CardComponent,
        UserInfoComponent,
        TweetComponent,
        TweetLoaderComponent,
    ],
    exports: [
        ToastComponent,
        CardComponent,
        UserInfoComponent,
        TweetComponent,
        MatInputModule,
        TweetLoaderComponent,
    ],
})
export class ComponentsModule { }
