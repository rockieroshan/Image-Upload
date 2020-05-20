import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private loaderSubject = new Subject<MessageState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  addMessageToNotification(type: string, title: string, message: string) {
    const notificationMessage = {
      severity: type,
      summary: title,
      detail: message,
      life: 5000
    };
    this.loaderSubject.next(notificationMessage as MessageState);
  }
}
export interface MessageState {
  severity: string;
  summary: string;
  detail: string;
}
