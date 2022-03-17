import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebStorageService {

    constructor() { }

    set(key: string, value: string): void {
        return localStorage.setItem(key, value);
    }

    get(key: string, force: boolean = false): any {
        return localStorage.getItem(key);
    }

    clear(): void {
        return localStorage.clear();
    }
}
