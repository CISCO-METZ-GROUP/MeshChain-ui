import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private sortOrder: any = {
    property: '',
    order: 1
  };

  public isWorkingSubject: Subject<boolean> = new Subject();

  constructor() { }

  /**
   * Create request options for all http requests
   * Usage:
   *  - import CoreService into your service where you want to use http
   *  - add options to request
   * @returns {RequestOptions}
   */
  public getRequestOptions(): RequestOptions {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'Basic b3BlbmJtcDpDaXNjb1JB');
    return new RequestOptions({headers: headers});
  }

  /**
   * Create list of objects based on type
   * @param response
   * @param type
   */
  public extractListData<T>(response: Response, type: { new (value: any): T }): Array<T> {
    return response.json().map(
      data => {
        return new type(data);
      }
    );
  }

  // /**
  //  * Create list of objects from Object with many keys based on type
  //  * @param response
  //  * @param type
  //  * @returns {[string,string,string,string,string]}
  //  */
  // public extractObjectData<T>(response: Response, type: { new (value: any): T}): Array<T> {
  //   const data = response.json();

  //   return Object.keys(data).map(
  //     key => {
  //       return new type(data[key]);
  //     }
  //   );
  // }

  public extractObjectData<T>(data, type: { new (value: any): T}): Array<T> {
    const arr = [];
    data.forEach(e => {
      e.forEach(block => {
        arr.push(new type(block));
      });

    });

    return arr;
  }

  /**
   * Sort array of objects by specified property
   * @param array
   * @param property
   * @param order - 1 for ASC, -1 for DESC
   */
  public sortArray(array: any[], property: string, order?: number): void {
    let _order = order;

    if (!order) {
      if (this.sortOrder.property === property) {
        this.sortOrder.order *= -1;
      } else {
        this.sortOrder.property = property;
        this.sortOrder.order = 1;
      }

      _order = this.sortOrder.order;
    }

    array.sort(
      (r1, r2) => {
        if (r1[property] < r2[property]) {
          return -1 * _order;
        }

        if (r1[property] > r2[property]) {
          return 1 * _order;
        }

        return 0;
      }
    );
  }

  public clearSortOrder(): void {
    this.sortOrder = {
      property: '',
      order: 1
    };
  }

  public setSortClasses(event): void {
    if (event.target.classList.contains('table-sort')) {
      event.target.classList.toggle('desc');
    } else {
      const elements = document.getElementsByClassName('table-sort');

      if (elements && elements.length) {
        elements[0].classList.remove('table-sort');
      }

      event.target.classList.add('table-sort');
      event.target.classList.remove('desc');
    }
  }
}
