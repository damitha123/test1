import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

    constructor() { }

    private subject = new Subject<string>();

    sendMessage(message: string) {
        this.subject.next(message);
    }

    clearMessages() {
        this.subject.next('');
    }

    getMessage(): Observable<string> {
        return this.subject.asObservable();
    }
}


