import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionModel } from '../../../shared/models/transaction-model';
import { BusinessService } from './business.service';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit, OnDestroy {

  data: TransactionModel[];
  loading: boolean;
  businessSubscription: Subscription;
  sortedData;

  constructor(
    private businessService: BusinessService
  ) { }

  ngOnInit() {
    this.loading = true;

    this.businessSubscription = this.businessService.load().subscribe(
      res => {
        this.data = res;
        this.sortedData = res.slice();
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.businessSubscription.unsubscribe();
  }

  sortData(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'timestamp': return this.compare(+a.timestamp, +b.timestamp, isAsc);
        case 'oem': return this.compare(a.oem, b.oem, isAsc);
        case 'designName': return this.compare(a.designName, b.designName, isAsc);
        case 'companyName': return this.compare(a.companyName, b.companyName, isAsc);
        case 'action': return this.compare(a.action, b.action, isAsc);
        case 'value': return this.compare(a.value, b.value, isAsc);
        case 'blockNumber': return this.compare(+a.blockNumber, +b.blockNumber, isAsc);

        default: return 0;
      }
    });
  }

  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
