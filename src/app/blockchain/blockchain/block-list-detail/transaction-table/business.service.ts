import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionModel } from '../../../shared/models/transaction-model';
import { AppConfig } from '../../../../app-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SmartContractService } from '../../../../smart-contract/smart-contract.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(
    private http: HttpClient,
    private smartContractService: SmartContractService
  ) { }

  public load(): Observable<TransactionModel[]> {
    const body = {
      fromBlock: 0,
      toBlock: 'latest',
      address: AppConfig.ADDRESS
    };

    return this.http.post(AppConfig.REST_M_ENTERPRISE_BASE_URL + '/get_all_traces', body).pipe(
      map(res => this.extractObjectData(res, TransactionModel))
    );
  }

  private extractObjectData<T>(data, type: { new (value: any): T}): Array<T> {
    const arr = [];

    data.forEach(item => {
      item.metadata = JSON.parse(item.metadata);

      if (item.metadata && item.metadata.length) {
        item.metadata.forEach(metadata => {
          metadata.name = item.name;
          metadata.blockNo = item.blockNo;

          arr.push(new TransactionModel(metadata));
        });
      }
    });

    return arr;
  }
}
