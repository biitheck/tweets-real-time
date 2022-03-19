import { Component, Input, OnInit } from '@angular/core';
import { Tweet, TwitterUser, Media } from './../../models';

@Component({
    selector: 'app-tweet',
    templateUrl: './tweet.component.html',
    styleUrls: ['./tweet.component.scss'],
})

export class TweetComponent implements OnInit {
    @Input() tweet: Tweet;

    public twitterUser: TwitterUser;
    public media: Media;

    constructor() {

    }

    ngOnInit(): void {
        this.twitterUser = this.tweet?.includes?.users?.length >= 0
            ? this.tweet?.includes?.users[0]
            : {} as TwitterUser;

        this.media = this.tweet?.includes?.media?.length >= 0
            ? this.tweet?.includes?.media[0]
            : {} as Media;
    }
}
