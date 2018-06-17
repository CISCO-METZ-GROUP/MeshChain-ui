import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BlockModel } from '../shared/models/block-model';
import { CoreService } from '../../shared/core.service';
import { AppConfig } from '../../app-config';
import { SmartContractService } from '../../smart-contract/smart-contract.service';

@Injectable({
  providedIn: 'root'
})
export class BlockListService {

  appConfig: any;
  blockListObservable: Observable<BlockModel[]>;

  private blockList: BlockModel[];

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private smartContractService: SmartContractService
  ) { }

  public load(): Observable<BlockModel[]> {
    const body = {
      address: this.smartContractService.getAddress()
      // address: '0xFf03520393528AbA208fE1A276789d346efac055'
    };

    return this.blockListObservable = this.http
      .post<BlockModel[]>(AppConfig.REST_BASE_URL + '/getBlocks', body)
      .pipe(
        map((res) => this.extractObjectData(res, BlockModel))
      );
  }

  sortBlocks(property: string) {
    this.blockList.sort(
      (a, b) => {
        if (a[property] && b[property]) {
          return a[property] - b[property];
        } else {
          return 0;
        }
      }
    );
  }

  setblockList(list: BlockModel[]): void {
    this.blockList = list;
  }

  getBlockList(): BlockModel[] {
    return this.blockList;
  }

  getItemFromBlockList(blockId): BlockModel {
    return this.blockList.find(bl => bl.height === blockId);
  }

  getItemFromByIndex(index: number): BlockModel {
    return this.blockList[index];
  }

  private extractObjectData<T>(data, type: { new (value: any): T}): Array<T> {
    const arr = [];
    data.forEach(block => {
      arr.push(new type(block['Block']));
    });

    return arr;
  }

}
