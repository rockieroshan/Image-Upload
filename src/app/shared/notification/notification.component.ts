import { Component, OnInit } from '@angular/core';
import { NotificationService, MessageState } from './notification.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {
  life = 5000;
  constructor(
    private notification: NotificationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.notification.loaderState.subscribe(
      (state: MessageState) => {
        this.messageService.clear();
        this.messageService.add(state);
      },
      err => {
        // console.log(err);
      }
    );
  }
}
