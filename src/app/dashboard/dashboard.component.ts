import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmartContractService } from '../smart-contract/smart-contract.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isSplashScreenOpened: boolean;

  constructor(
    private smartContractService: SmartContractService
  ) { }

  ngOnInit() {
    this.isSplashScreenOpened = !this.smartContractService.contractDeployed;
  }

  public deploySmartContract() {
    this.isSplashScreenOpened = false;
    this.smartContractService.deployContract();
  }

}
