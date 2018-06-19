import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionModel } from '../../../shared/models/transaction-model';
import { AppConfig } from '../../../../app-config';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { SmartContractService } from '../../../../smart-contract/smart-contract.service';

interface PostType {
  fromBlock: 0;
  toBlock: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(
    private http: HttpClient,
    private smartContractService: SmartContractService
  ) { }

  public load(): Observable<[TransactionModel[], TransactionModel[]]> {
    const addressE = this.smartContractService.getAddress(false);
    const addressP = this.smartContractService.getAddress(true);

    const bodyE: PostType = {
      fromBlock: 0,
      toBlock: 'latest',
    };

    if (addressE) {
      bodyE.address = addressE;
    }

    const bodyP: PostType = {
      fromBlock: 0,
      toBlock: 'latest',
    };

    if (addressP) {
      bodyP.address = addressP;
    }

    const obsE = this.http.post(AppConfig.REST_M_ENTERPRISE_BASE_URL + '/get_all_traces', bodyE).pipe(
      map(res => this.extractObjectData(res, TransactionModel, 'Enterprise'))
    );

    const obsP = this.http.post(AppConfig.REST_M_PUBLIC_BASE_URL + '/get_all_traces', bodyP).pipe(
      map(res => this.extractObjectData(res, TransactionModel, 'Public Cloud'))
    );

    return forkJoin(obsE, obsP);
  }

  private extractObjectData<T>(data, type: { new (value: any): T}, mesh: string): Array<T> {
    const arr = [];

    data.forEach(item => {
      try {
        item.metadata = JSON.parse(item.metadata);
      } catch (error) {
        // console.warn(error);
      }

      if (Array.isArray(item.metadata)) {
        item.metadata.forEach(metadata => {
          metadata.name = item.name;
          metadata.blockNo = item.blockNo;
          metadata.mesh = mesh;

          arr.push(new type(metadata));
        });
      }
    });

    return arr;
  }
}
