import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BlockModel } from '../shared/models/block-model';
import { BlockListService } from './block-list.service';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit, OnDestroy {

  loading: boolean;
  blockList: BlockModel[];
  displayBlockList: BlockModel[];
  formDateFrom: Date;
  formDateTo: Date;
  formTimeFrom: string;
  formTimeTo: string;
  formatateFrom;
  formatateTo;
  private blockListSubsription: Subscription;

  constructor(
    private blockListService: BlockListService
  ) { }

  ngOnInit() {
    this.loading = true;

    this.blockListSubsription = this.blockListService
      .load()
      .subscribe(
        bl => {
          this.blockListService.setblockList(bl);
          this.blockListService.sortBlocks('height');

          this.blockList = this.blockListService.getBlockList();
          this.displayBlockList = this.blockListService.getBlockList();
        },
        e => console.error('Error loading blocks: ', e),
        () => this.loading = false
      );
  }

  ngOnDestroy() {
    this.blockListSubsription.unsubscribe();
  }

  query(): void {
    this.displayBlockList = this.blockList.filter(
      b => {
        if ( b.timestamp > this.formDateFrom.getTime() && b.timestamp < this.formDateTo.getTime()) {
          return b;
        }
      }
    );
  }

  reset(): void {
    this.displayBlockList = this.blockList;
  }

}
