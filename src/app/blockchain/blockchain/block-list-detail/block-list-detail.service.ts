import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../app-config';
import { Observable, forkJoin } from 'rxjs';
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

  public load(blockNumber: number): Observable<[TransactionModel[], TransactionModel[]]> {
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
      map(res => this.extractObjectData(res, TransactionModel, blockNumber, 'Enterprise'))
    );

    const obsP = this.http.post(AppConfig.REST_M_PUBLIC_BASE_URL + '/get_transactions_in_block', bodyP).pipe(
      map(res => this.extractObjectData(res, TransactionModel, blockNumber, 'Public'))
    );

    return forkJoin(obsE, obsP);
  }

  private extractObjectData<T>(data, type: { new (value: any): T}, blockNumber: number, mesh: string): Array<T> {
    const arr = [];
    // console.log(data);

    data.forEach(item => {
      if (item.newTrace) {
        let traces = [];

        try {
          traces = JSON.parse(item.newTrace.metadata);
        } catch (error) {
          // console.warn(error);
        }

        if (Array.isArray(traces)) {
          traces.forEach(t => {
            t.name = item.newTrace.name;
            t.blockNo = blockNumber;
            t.mesh = mesh;

            arr.push(new TransactionModel(t));
          });
        }
      }
    });

    // arr.push(new type(data));

    return arr;
  }

}
