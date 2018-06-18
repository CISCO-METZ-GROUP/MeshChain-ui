import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app-config';

import { CoreService } from '../shared/core.service';
import { NotificationService } from '../notification/notification.service';
import { Subject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {

  public contractDeployed: boolean;
  public contractDeployedSubject: Subject<boolean> = new Subject();
  public smartContractEnterprise;
  public smartContractPublic;
  public splashOpen: boolean;

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private notificationService: NotificationService
  ) {
    this.contractDeployed = false;
    this.splashOpen = true;
  }

  public deployContract() {
    this.coreService.isWorkingSubject.next(true);
    this.contractDeployed = true;

    const body = {};

    const obsE = this.http.post(AppConfig.REST_M_ENTERPRISE_BASE_URL + '/create_auditchain', body);
    const obsP = this.http.post(AppConfig.REST_M_PUBLIC_BASE_URL + '/create_auditchain', body);

    forkJoin(obsE, obsP).subscribe(
      res => {
        this.smartContractEnterprise = res[0];
        this.smartContractPublic = res[1];
        this.coreService.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Successful', 'Smart Contract Successfully Deployed', 'success');
      },
      error => {
        this.coreService.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Failed', 'Smart Contract Deployment Has Failed', 'danger');
      }
    );
  }

  public getAddress(isPublic: boolean): string {
    const item = isPublic ? this.smartContractPublic : this.smartContractEnterprise;

    if (item) {
      return item.auditchain.contractAddress;
    } else {
      return '';
    }
  }

}
