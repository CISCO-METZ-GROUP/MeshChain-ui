import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionModel } from '../../../shared/models/transaction-model';
import { AppConfig } from '../../../../app-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(
    private http: HttpClient
  ) { }

  public load(): Observable<TransactionModel[]> {
    const body = {
      address: AppConfig.ADDRESS,
    };

    return this.http.post(AppConfig.REST_BASE_URL + '/buisnessLogs', body).pipe(
      map(res => this.extractObjectData(res, TransactionModel))
    );
  }

  private extractObjectData<T>(data, type: { new (value: any): T}): Array<T> {
    const arr = [];

    data.forEach(item => {
      arr.push(new type(item));
    });

    return arr;
  }
}
