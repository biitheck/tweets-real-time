import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { messages } from 'app/config/app.config';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-tweets-main',
    templateUrl: './tweets-main.component.html',
    styleUrls: ['./tweets-main.component.scss'],
})
export class TweetsMainComponent implements OnInit, OnDestroy {

    public loading: boolean;
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toasterSrv: ToastrService,
    ) {
        this.loading = false;
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
