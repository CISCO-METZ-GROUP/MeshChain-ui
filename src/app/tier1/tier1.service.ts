import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoreService } from '../shared/core.service';
import { NotificationService } from '../notification/notification.service';
import { AppConfig } from '../app-config';
import { WebsocketService } from '../shared/websocket.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NewVerdictMsg {
  T1name: string;
  VNETDesignName: string;
  Verdict: string;
}

@Injectable({
  providedIn: 'root'
})
export class Tier1Service {

  public messages: Subject<NewVerdictMsg>;

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private notificationService: NotificationService,
    private webSocketService: WebsocketService
  ) { }

  public deployVerdict(name: string, verdict: string, address: string, T1Name: string) {
    this.coreService.isWorkingSubject.next(true);

    const body = {
      name: name,
      verdict: verdict,
      address: address,
      T1Name: T1Name
    };

    this.http.post(AppConfig.REST_BASE_URL + '/addVerdict', body).subscribe(
      res => {
        this.coreService.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Successful', 'Verdict Successfully Deployed to Blockchain', 'success');
      },
      error => {
        this.coreService.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Failed', 'Verdict Deployement Has Failed', 'danger');
      }
    );
  }

  public connectWS(): Subject<NewVerdictMsg> {
    return <Subject<NewVerdictMsg>>this.webSocketService
    .connect(AppConfig.WS_URL + ':8383')
    .pipe(
      map((res: MessageEvent): NewVerdictMsg => {
        const data = JSON.parse(res.data);
        return {
          T1name: data.T1name,
          VNETDesignName: data.VNETDesignName,
          Verdict: data.Verdict
        };
      })
    );
  }

  public destroyWS() {
    this.webSocketService.close();
  }

}
