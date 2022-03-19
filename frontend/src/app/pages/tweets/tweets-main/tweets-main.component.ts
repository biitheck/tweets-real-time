import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from 'angularx-social-login';
import { DataService } from '../../../services/data.service';
import { Socket } from 'ngx-socket-io';
import { Tweet, User } from '../../../models';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

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

    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
        private toasterSrv: ToastrService,
        private socketIO: Socket,
        private dataSrv: DataService,
        private authService: SocialAuthService,
    ) {
        this.loading = false;
        this.tweets = new Array<Tweet>();
        this.user = this.dataSrv.getUser();


        this.separatorKeysCodes = [ENTER, COMMA];
        this.topicsCtrl = new FormControl();
        this.topics = ['Code', 'Typescript', 'C#'];
        this.allTopics = ['Code', 'Typescript', 'C#', 'Cats', 'Russian'];

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
        this.socketIO.connect();

        this.socketIO.on('connect', () => {
            console.log('Connected to server...');
        });

        this.socketIO.on('tweet', (tweet: Tweet) => {
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
            this.topics.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.topicsCtrl.setValue(null);
    }

    onRemoveTopic(topic: string): void {
        const index = this.topics.indexOf(topic);

        if (index >= 0) {
            this.topics.splice(index, 1);
        }
    }

    onSelectedTopic(event: MatAutocompleteSelectedEvent): void {
        this.topics.push(event.option.viewValue);
        this.topicInput.nativeElement.value = '';
        this.topicsCtrl.setValue(null);
    }


    private filterTopics(value: string): string[] {
        const filterValue = value.toLowerCase().trim();
        return this.allTopics
            .filter(topic => topic
                .toLowerCase()
                .indexOf(filterValue) === 0);
    }
}
