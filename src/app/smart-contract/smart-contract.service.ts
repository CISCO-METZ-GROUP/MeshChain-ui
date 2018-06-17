import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app-config';

import { CoreService } from '../shared/core.service';
import { NotificationService } from '../notification/notification.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {

  public contractDeployed: boolean;
  public contractDeployedSubject: Subject<boolean> = new Subject();
  public smartContract;

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private notificationService: NotificationService
  ) {
    this.contractDeployed = false;
  }

  public deployContract() {
    this.coreService.isWorkingSubject.next(true);
    this.contractDeployed = true;

    const body = {};

    this.http.post(AppConfig.REST_BASE_URL + '/create-contract', body).subscribe(
      res => {
        this.smartContract = res;
        this.subscribe();
      },
      error => {
        this.coreService.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Failed', 'Smart Contract Deployment Has Failed', 'danger');
      }
    );
  }

  public getAddress(): string {
    if (this.smartContract) {
      return this.smartContract.receipts[1].vibes.contractAddress;
    } else {
      return '';
    }
  }

  private subscribe() {
    const body = {
      address: this.getAddress()
    };

    this.http.post(AppConfig.REST_BASE_URL + '/subscribe', body).subscribe(
      res => {
        this.subscribeVerdict();
      },
      error => {
        this.coreService.isWorkingSubject.next(false);
        this.notificationService.openModal('Subcription Failed', 'Subscribe Function Has Failed', 'danger');
      }
    );
  }

  private subscribeVerdict() {
    const body = {
      address: this.getAddress()
    };

    this.http.post(AppConfig.REST_BASE_URL + '/subscribeVerdict', body).subscribe(
      res => {
        this.coreService.isWorkingSubject.next(false);
        this.notificationService.openModal('Deployment Successful', 'Smart Contract Successfully Deployed', 'success');
        this.contractDeployedSubject.next(true);
      },
      error => {
        this.coreService.isWorkingSubject.next(false);
        this.notificationService.openModal('Subcription Failed', 'Subscribe Function Has Failed', 'danger');
      }
    );
  }

}
