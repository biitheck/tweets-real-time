import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'timeAgo' })

export class TimeAgoPipe implements PipeTransform {
    transform(date: any): string {

        if (!moment(date).isValid()) {
            return date;
        }

        const d = moment(date).toDate();

        const now = new Date();

        if (d > now) {
            const seconds = Math.round(Math.abs((d.getTime() - now.getTime()) / 1000));
            const minutes = Math.round(Math.abs(seconds / 60));
            const hours = Math.round(Math.abs(minutes / 60));
            const days = Math.round(Math.abs(hours / 24));
            const weeks = Math.round(Math.abs(days / 7));
            const months = Math.round(Math.abs(days / 30.416));
            const years = Math.round(Math.abs(days / 365));

            if (Number.isNaN(seconds)) {
                return '';
            } else if (seconds <= 45) {
                return 'a few seconds';
            } else if (seconds <= 90) {
                return 'a minute';
            } else if (minutes <= 59) {
                return minutes + ' minutes';
            } else if (minutes > 59 && minutes <= 90) {
                return 'an hour';
            } else if (hours <= 23) {
                return 'Due in ' + hours + ' hours';
            } else if (hours > 23 && hours <= 36) {
                return 'Due in a day';
            } else if (days <= 29) {
                return 'Due in ' + days + ' days';
            } else if (days <= 30) {
                if (weeks === 4) {
                    return 'Due in ' + months + ' month';
                }
                return 'Due in ' + weeks + ' weeks';
            } else if (days > 29 && days <= 30) {
                return 'a month';
            } else if (days <= 345) {
                return 'Due in ' + months + ' months';
            } else if (days <= 545) {
                return moment(date).format('MM.DD.YY');
            } else {
                return moment(date).format('MM.DD.YY');
            }

        }

        if (d < now) {
            const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
            const minutes = Math.round(Math.abs(seconds / 60));
            const hours = Math.round(Math.abs(minutes / 60));
            const days = Math.round(Math.abs(hours / 24));
            const weeks = Math.round(Math.abs(days / 7));
            const months = Math.round(Math.abs(days / 30.416));
            const years = Math.round(Math.abs(days / 365));

            if (Number.isNaN(seconds)) {
                return '';
            } else if (seconds <= 45) {
                return 'a few seconds ago';
            } else if (seconds <= 90) {
                return 'a minute ago';
            } else if (minutes <= 59) {
                return minutes + ' minutes ago';
            } else if (minutes > 59 && minutes <= 90) {
                return 'an hour ago';
            } else if (hours <= 23) {
                return hours + ' hours ago';
            } else if (hours > 23 && hours <= 36) {
                return 'a day ago';
            } else if (days <= 30) {
                if (weeks === 4) {
                    return months + ' month ago';
                }
                return weeks + ' weeks ago';
            } else if (days > 29 && days <= 30) {
                return '1 month ago';
            } else if (days <= 345) {
                return months + ' months ago';
            } else if (days <= 545) {
                return moment(date).format('MM.DD.YY');
            } else {
                return moment(date).format('MM.DD.YY');
            }
        }
    }
}




// current time - comm time seconds 
