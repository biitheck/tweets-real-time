import { User } from './../models';
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

    setUser(user: User): void {
        this.webStorageSrv.set(environment.userKey, JSON.stringify(user));
    }

    getUser(): User {
        const payload = this.webStorageSrv.get(environment.userKey);
        return JSON.parse(payload) as User;
    }

    isLoggedIn(): boolean {
        const payload = this.webStorageSrv.get(environment.userKey);
        return JSON.parse(payload) !== undefined && JSON.parse(payload) !== null;
    }

    setTopics(tags: string[]): void {
        this.webStorageSrv.set('topics', JSON.stringify(tags));
    }

    getTopics(): string[] {
        const payload = this.webStorageSrv.get('topics');
        return JSON.parse(payload) as string[];
    }

    clean(): void {
        this.webStorageSrv.clear();
    }
}
