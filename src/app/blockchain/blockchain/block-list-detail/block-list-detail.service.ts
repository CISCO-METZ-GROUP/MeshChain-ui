import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../app-config';
import { Observable } from 'rxjs';
import { TransactionModel } from '../../shared/models/transaction-model';
import { map } from 'rxjs/operators';
import { SmartContractService } from '../../../smart-contract/smart-contract.service';

@Injectable({
  providedIn: 'root'
})
export class BlockListDetailService {

  constructor(
    private http: HttpClient,
    private smartContractService: SmartContractService
  ) { }

  public load(blockNumber: number): Observable<TransactionModel[]> {
    const body = {
      address: AppConfig.ADDRESS_E,
      blockNo: blockNumber
    };

    return this.http.post(AppConfig.REST_M_ENTERPRISE_BASE_URL + '/get_transactions_in_block', body).pipe(
      map(res => this.extractObjectData(res, TransactionModel, blockNumber))
    );
  }

  private extractObjectData<T>(data, type: { new (value: any): T}, blockNumber: number): Array<T> {
    const arr = [];
    // console.log(data);

    data.forEach(item => {
      if (item.newTrace) {
        const traces = JSON.parse(item.newTrace.metadata);

        traces.forEach(t => {
          t.name = item.newTrace.name;
          t.blockNo = blockNumber;

          arr.push(new TransactionModel(t));
        });
      }
    });

    // arr.push(new type(data));

    return arr;
  }

}
