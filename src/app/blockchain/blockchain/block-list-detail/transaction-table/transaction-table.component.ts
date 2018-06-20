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
        const arr = res[0].concat(res[1]);

        this.data = arr;
        this.sortedData = arr.slice();
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
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'traceId': return this.compare(a.traceId, b.traceId, isAsc);
        case 'serviceMesh': return this.compare(a.serviceMesh, b.serviceMesh, isAsc);
        case 'duration': return this.compare(+a.duration, +b.duration, isAsc);

        default: return 0;
      }
    });
  }

  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
