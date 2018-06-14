import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  private isOpenNotificationSubscription: Subscription;

  public isNotificationDialogOpen: boolean;
  public title: string;
  public msg: string;
  public severity: string;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.isNotificationDialogOpen = false;

    this.isOpenNotificationSubscription = this.notificationService.isNotificationDialogOpenSubject.subscribe(notification => {
      if (notification !== null) {
        this.title = notification.title;
        this.msg = notification.msg;
        this.severity = notification.severity;
      }
      this.isNotificationDialogOpen = notification !== null ? true : false;
    });
  }

  ngOnDestroy() {
    this.isOpenNotificationSubscription.unsubscribe();
  }
}
