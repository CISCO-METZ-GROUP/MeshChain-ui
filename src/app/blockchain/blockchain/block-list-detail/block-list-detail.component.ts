import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlockModel } from '../../shared/models/block-model';
import { Subscription } from 'rxjs';
import { BlockListService } from '../block-list.service';
import { ActivatedRoute } from '@angular/router';

import { BlockListDetailService } from './block-list-detail.service';
import { TransactionModel } from '../../shared/models/transaction-model';

@Component({
  selector: 'app-block-list-detail',
  templateUrl: './block-list-detail.component.html',
  styleUrls: ['./block-list-detail.component.css']
})
export class BlockListDetailComponent implements OnInit, OnDestroy {


  item: BlockModel;
  transactions: TransactionModel[];
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
        this.transactions = tr;
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
}
