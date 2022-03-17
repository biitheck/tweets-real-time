import { Component } from '@angular/core';
import { Toast } from 'ngx-toastr';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    preserveWhitespaces: false,
})
export class ToastComponent extends Toast { }
