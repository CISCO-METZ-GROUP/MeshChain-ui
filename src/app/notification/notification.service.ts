import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public isNotificationDialogOpenSubject = new Subject<{
    title: string,
    msg: string,
    severity: string
  }>();


  openModal(title: string, msg: string, severity: string) {
    this.isNotificationDialogOpenSubject.next({
      title: title,
      msg: msg,
      severity: severity
    });
  }

  closeModal() {
    this.isNotificationDialogOpenSubject.next(null);
  }

}
