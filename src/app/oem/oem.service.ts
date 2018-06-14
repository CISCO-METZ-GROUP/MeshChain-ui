import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../shared/core.service';
import { AppConfig } from '../app-config';
import { NotificationService } from '../notification/notification.service';
import { WebsocketService } from '../shared/websocket.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NewDesignMsg {
  OEM: string;
  VNETDesignName: string;
}

@Injectable({
  providedIn: 'root'
})
export class OemService {

  public deployedName: string;
  public messages: Subject<NewDesignMsg>;

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private notificationService: NotificationService,
    private webSocketService: WebsocketService
  ) { }

  public deployDesign(designName: string, OEMName: string, address: string) {
    this.coreService.isWorkingSubject.next(true);

    this.deployedName = designName;

    const body = {
      topo: JSON.stringify(AppConfig.POST_OEM_TOPO),
      name: designName,
      address: address,
      cname: OEMName
    };

    this.http.post(AppConfig.REST_BASE_URL + '/addData', body).subscribe(
      res => {
        this.coreService.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Successfull', 'VNet Design Successfully Deployed to Blockchain', 'success');
      },
      error => {
        this.coreService.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Failed', 'VNet Design Deployment Has Failed', 'danger');
      }
    );
  }

  public connectWS(): Subject<NewDesignMsg> {
    return <Subject<NewDesignMsg>>this.webSocketService
    .connect(AppConfig.WS_URL + ':8282')
    .pipe(
      map((res: MessageEvent): NewDesignMsg => {
        const data = JSON.parse(res.data);
        return {
          OEM: data.OEM,
          VNETDesignName: data.VNETDesignName
        };
      })
    );
  }

  public destroyWS() {
    this.webSocketService.close();
  }

}
