import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SplashScreenService } from './services';
import { Platform } from '@angular/cdk/platform';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

    private googleLogoURL =
        "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
    
    constructor(
        private _platform: Platform,
        @Inject(DOCUMENT) private document: any,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private _splashScreenSrv: SplashScreenService,
    ) { 
        // register google icon.
        this.matIconRegistry.addSvgIcon(
            "google",
            this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));
    }

    ngOnInit(): void { }
    ngOnDestroy(): void { }
}
