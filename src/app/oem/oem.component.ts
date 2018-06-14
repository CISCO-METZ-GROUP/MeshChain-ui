import { Component, OnInit, OnDestroy } from '@angular/core';
import { OemService, NewDesignMsg } from './oem.service';
import { AppConfig } from '../app-config';
import { Subscription } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-oem',
  templateUrl: './oem.component.html',
  styleUrls: ['./oem.component.css']
})
export class OemComponent implements OnInit, OnDestroy {

  public designName: string;
  public notif: NewDesignMsg;
  private OEMName: string;
  private wsMsgSubscription: Subscription;

  constructor(
    private OEMService: OemService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notif = null;
    this.OEMName = 'Ford';
    this.wsMsgSubscription = this.OEMService.connectWS().subscribe(
      res => {
        console.log(res);
        this.notif = res;
      }
    );
  }

  ngOnDestroy() {
    this.OEMService.destroyWS();
    this.wsMsgSubscription.unsubscribe();
  }

  public selectDesign(e: Event, name: string) {
    this.setClasses(e);
    this.designName = name;
  }

  public deployDesign() {
    this.OEMService.deployDesign(this.designName, this.OEMName, AppConfig.ADDRESS);
  }

  public pushNotification() {
    if (this.notif) {
      this.notificationService.openModal('New VNet Design', this.notif.OEM + ' deployed ' + this.notif.VNETDesignName, 'info');
      this.notif = null;
    }
  }

  private setClasses(e: Event) {
    if (e.target['className'] !== 'img-wrap') {
      const selEl = document.querySelector('.selected');

      if (selEl) {
        selEl.classList.remove('selected');
      }

      const clickElement: Element = e.target['parentNode']['parentNode'];
      clickElement.classList.add('selected');
    }
  }

}
