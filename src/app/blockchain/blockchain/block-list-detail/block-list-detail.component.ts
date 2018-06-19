import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlockModel } from '../../shared/models/block-model';
import { Subscription } from 'rxjs';
import { BlockListService } from '../block-list.service';
import { ActivatedRoute } from '@angular/router';

import { BlockListDetailService } from './block-list-detail.service';
import { TransactionModel } from '../../shared/models/transaction-model';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-block-list-detail',
  templateUrl: './block-list-detail.component.html',
  styleUrls: ['./block-list-detail.component.css']
})
export class BlockListDetailComponent implements OnInit, OnDestroy {


  item: BlockModel;
  transactions: TransactionModel[];
  transactionsSorted: TransactionModel[];
  loading: boolean;
  loadingTransactions: boolean;
  id: number;
  nextId: number;
  previousId: number;

  private paramsSubscription: Subscription;
  private blockListSubsription: Subscription;
  private transactionListSubscription: Subscription;

  constructor(private blockListService: BlockListService,
              private route: ActivatedRoute,
              private blockListDetailService: BlockListDetailService
              // private transactionService: TransactionService
            ) {
  }

  ngOnInit() {

    this.paramsSubscription = this.route.params.subscribe(
      params => {
        const blockList = this.blockListService.getBlockList();

        this.loading = true;
        this.id = +params['id'];
        this.nextId = this.id + 1;
        this.previousId = this.id === 0 ? 0 : this.id - 1;

        if (blockList && blockList.length) {
          this.item = this.blockListService.getItemFromBlockList(this.id);
          this.loading = false;
          this.loadTransactionsForCurrentBlock();
        } else {
          this.loadBlockList(this.id);
        }
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();

    if (this.blockListSubsription) {
      this.blockListSubsription.unsubscribe();
    }
  }

  loadBlockList(blockId: number): void {

    this.blockListSubsription = this.blockListService
      .load()
      .subscribe(
        bl => {
          this.blockListService.setblockList(bl);
          this.item = this.blockListService.getItemFromBlockList(blockId);
          this.loadTransactionsForCurrentBlock();
        },
        e => {
          console.error('Error loading blocks: ', e);
          this.loading = false;
        },
        () => this.loading = false
      );
  }

  loadTransactionsForCurrentBlock(): void {
    this.loadingTransactions = true;

    this.transactionListSubscription = this.blockListDetailService.load(this.id).subscribe(
      tr => {
        const arr = tr[0].concat(tr[1]);

        this.transactions = arr;
        this.transactionsSorted = arr;
        this.loadingTransactions = false;
      }
    );

    // this.item.tx.map(
    //   txId => {
    //     this.transactionListSubscription = this.transactionService.load(txId).subscribe(
    //       t => {
    //         this.item.transactionList.push(t);
    //       },
    //       e => {
    //         console.error('Error loading transaction: ', e);
    //         this.loadingTransactions = false;
    //       },
    //       () => this.loadingTransactions = false
    //     );
    //   }
    // );



  }

  sortData(sort: Sort) {
    const data = this.transactions.slice();
    if (!sort.active || sort.direction === '') {
      this.transactionsSorted = data;
      return;
    }

    this.transactionsSorted = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'timestamp': return this.compare(+a.timestamp, +b.timestamp, isAsc);
        case 'traceId': return this.compare(a.traceId, b.traceId, isAsc);
        case 'serviceMesh': return this.compare(a.serviceMesh, b.serviceMesh, isAsc);
        case 'numOfServices': return this.compare(+a.numOfServices, +b.numOfServices, isAsc);
        case 'services': return this.compare(a.services, b.services, isAsc);
        case 'duration': return this.compare(+a.duration, +b.duration, isAsc);

        default: return 0;
      }
    });
  }

  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
