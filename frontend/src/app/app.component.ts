import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SplashScreenService } from './services';
import { Platform } from '@angular/cdk/platform';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

    constructor(
        private _platform: Platform,
        @Inject(DOCUMENT) private document: any,
        private _splashScreenSrv: SplashScreenService,
    ) { }

    ngOnInit(): void { }
    ngOnDestroy(): void { }
}
