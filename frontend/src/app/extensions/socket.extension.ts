import { Socket } from 'ngx-socket-io';
import { DataService } from '../services/data.service';
import * as config from '../config/app.config';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MySocket extends Socket {
    constructor(
        private dataSrv: DataService,
    ) {
        super({ url: config.apiUrl, options: { autoConnect: false } });
        this.ioSocket['auth'] = {
            userId: this.dataSrv.getUser()?.email || null,
            token: this.dataSrv.getUser()?.token || null,
        };
    }
}
