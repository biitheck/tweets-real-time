import { Injectable } from '@angular/core';
import { WebStorageService } from './web-storage.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(
        private webStorageSrv: WebStorageService) {
    }

    createToken(token: string, username: string, type: string): void {
        this.webStorageSrv.set(environment.tokenKey, token);
        this.webStorageSrv.set('username', username);
    }

    getUserName(): string {
        return this.webStorageSrv.get('username');
    }

    clean(): void {
        this.webStorageSrv.clear();
    }
}
