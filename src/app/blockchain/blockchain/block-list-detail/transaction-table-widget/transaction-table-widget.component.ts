import { Component, OnInit, Input } from '@angular/core';
import { TransactionModel } from '../../../shared/models/transaction-model';

@Component({
  selector: 'app-transaction-table-widget',
  templateUrl: './transaction-table-widget.component.html',
  styleUrls: ['./transaction-table-widget.component.css']
})
export class TransactionTableWidgetComponent implements OnInit {

  @Input()
  data: TransactionModel[];

  @Input()
  loading: boolean;

  constructor() { }

  ngOnInit() {
    this.data = new Array<TransactionModel>();
  }

}
