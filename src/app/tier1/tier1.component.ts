import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tier1Service, NewVerdictMsg } from './tier1.service';
import { OemService } from '../oem/oem.service';
import { AppConfig } from '../app-config';
import { Subscription } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-tier1',
  templateUrl: './tier1.component.html',
  styleUrls: ['./tier1.component.css']
})
export class Tier1Component implements OnInit, OnDestroy {

  public designName;
  public notif: NewVerdictMsg;
  public verdict: string;
  public progress: number;
  private newVerdictSubscription: Subscription;

  constructor(
    private tier1Service: Tier1Service,
    private oemService: OemService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    // this.designName = 'ECUv1Update';
    this.notif = null;
    this.designName = this.oemService.deployedName;
    this.progress = 0;

    this.newVerdictSubscription = this.tier1Service.connectWS().subscribe(
      res => {
        console.log(res);
        this.notif = res;
      }
    );
  }

  ngOnDestroy() {
    this.tier1Service.destroyWS();
    this.newVerdictSubscription.unsubscribe();
  }

  public deployVerdict() {
    this.tier1Service.deployVerdict(this.designName, this.verdict, AppConfig.ADDRESS, 'T1');
  }

  public validate() {
    this.progress = 0;

    const interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 2;
      } else {
        clearInterval(interval);
      }
    }, 80);
  }

  public pushNotification() {
    if (this.notif) {
      this.notificationService.openModal('New Verdict', 'New Verdict Arrived for ' + this.notif.VNETDesignName, 'info');
      this.notif = null;
    }
  }

}
