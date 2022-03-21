import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from 'angularx-social-login';
import { DataService } from '../../../services/data.service';
import { Tweet, User } from '../../../models';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MySocket } from '../../../extensions';

@Component({
    selector: 'app-tweets-main',
    templateUrl: './tweets-main.component.html',
    styleUrls: ['./tweets-main.component.scss'],
})
export class TweetsMainComponent implements OnInit, OnDestroy {

    @ViewChild('autoComplete') matAutocomplete: MatAutocomplete;
    @ViewChild('topicInput') topicInput: ElementRef<HTMLInputElement>;

    public tweets: Tweet[];
    public loading: boolean;
    public user: User;

    public topicsCtrl: FormControl;
    public separatorKeysCodes: number[];
    public filteredTopics: Observable<string[]>;
    public topics: string[];
    public allTopics: string[];

    private socket: any;
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
        private toasterSrv: ToastrService,
        private socketIO: MySocket,
        private dataSrv: DataService,
        private authService: SocialAuthService,
    ) {
        this.loading = false;
        this.tweets = new Array<Tweet>();
        this.user = this.dataSrv.getUser();

        this.allTopics = [
            'Cats',
            'Technology',
            'Augmented reality',
            'Cloud computing',
            'Cloud platforms',
            'Computer programming',
            'Cryptocurrencies',
            'Data science',
            'Databases',
            'Drone technology',
            'FinTech',
            'Information security',
            'Internet of things',
            'Tech brands',
            'Tech news',
            'Tech personalities',
            'Virtual reality'
        ];

        this.topics = this.dataSrv.getTopics();

        if (!this.topics || this.topics?.length <= 0) {
            this.topics = ['Cats'];
            this.dataSrv.setTopics(this.topics);
        }

        this.allTopics.concat(this.topics);

        this.separatorKeysCodes = [ENTER, COMMA];
        this.topicsCtrl = new FormControl();

        this.filteredTopics = this.topicsCtrl
            .valueChanges
            .pipe(
                startWith(null),
                map((topic: string | null) => topic
                    ? this.filterTopics(topic)
                    : this.allTopics.slice()
                ));
    }

    ngOnInit(): void {
        this.changeTopicsOnSocket();

        this.socketIO.on('connect', () => {
            console.log('Connected to server...');
        });

        this.socketIO.on('tweet', (tweet: Tweet) => {
            if (this.tweets?.length > 500) {
                this.tweets = [];
            }
            this.tweets.unshift(tweet);
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.socketIO.disconnect();
    }

    async signOut(): Promise<void> {
        try {
            this.socketIO.disconnect();
            await this.authService.signOut();
        } finally {
            this.dataSrv.clean();
            void this.router.navigate(['']);
        }
    }

    onAddTopic(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our topic
        if ((value || '').trim()) {
            this.addTopic(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.topicsCtrl.setValue(null);
    }

    onRemoveTopic(topic: string): void {
        if (topic?.length > 1) {
            const index = this.topics.indexOf(topic);

            if (index >= 0) {
                this.topics.splice(index, 1);
            }
        }
    }

    onSelectedTopic(event: MatAutocompleteSelectedEvent): void {
        this.addTopic(event.option.viewValue);
        this.topicInput.nativeElement.value = '';
        this.topicsCtrl.setValue(null);
    }

    onSaveTopics(): void {
        this.changeTopicsOnSocket();
    }

    private changeTopicsOnSocket(): void {
        this.socketIO.disconnect();
        this.socketIO.ioSocket.io.opts.query = {
            topics: this.topics?.join(',')
        };

        this.dataSrv.setTopics(this.topics);
        this.socket = this.socketIO.connect();
    }

    private addTopic(value: string): void {
        value = value.trim();

        const isExist = this.topics
            ?.indexOf(value) > -1;

        if (this.topics?.length < 4 && !isExist) {
            this.topics.push(value);
        }
        this.allTopics.concat(this.topics);
    }

    private filterTopics(value: string): string[] {
        const filterValue = value.toLowerCase().trim();
        return this.allTopics
            .filter(topic => topic
                .toLowerCase()
                .indexOf(filterValue) === 0);
    }
}
