import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../app-config';
import { Observable, merge } from 'rxjs';
import { TransactionModel } from '../../shared/models/transaction-model';
import { map } from 'rxjs/operators';
import { SmartContractService } from '../../../smart-contract/smart-contract.service';

interface PostType {
  blockNo: number;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlockListDetailService {

  constructor(
    private http: HttpClient,
    private smartContractService: SmartContractService
  ) { }

  public load(blockNumber: number): Observable<TransactionModel[]> {
    const addressE = this.smartContractService.getAddress(false);
    const addressP = this.smartContractService.getAddress(true);

    const bodyE: PostType = {
      blockNo: blockNumber
    };

    if (addressE) {
      bodyE.address = addressE;
    }

    const bodyP: PostType = {
      blockNo: blockNumber
    };

    if (addressP) {
      bodyP.address = addressP;
    }

    const obsE = this.http.post(AppConfig.REST_M_ENTERPRISE_BASE_URL + '/get_transactions_in_block', bodyE).pipe(
      map(res => this.extractObjectData(res, TransactionModel, blockNumber))
    );

    const obsP = this.http.post(AppConfig.REST_M_PUBLIC_BASE_URL + '/get_transactions_in_block', bodyP).pipe(
      map(res => this.extractObjectData(res, TransactionModel, blockNumber))
    );

    return merge(obsE, obsP);
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
