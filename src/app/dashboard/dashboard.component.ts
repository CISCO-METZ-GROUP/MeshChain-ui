import { Component, OnInit, OnDestroy } from '@angular/core';
import { SmartContractService } from '../smart-contract/smart-contract.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isSplashScreenOpened: boolean;

  constructor(
    private smartContractService: SmartContractService
  ) { }

  ngOnInit() {
    this.isSplashScreenOpened = this.smartContractService.splashOpen;
  }

  ngOnDestroy() {
    this.smartContractService.splashOpen = false;
  }

  public deploySmartContract() {
    this.isSplashScreenOpened = false;
    this.smartContractService.deployContract();
  }

}
