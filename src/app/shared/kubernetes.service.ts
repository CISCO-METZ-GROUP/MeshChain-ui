import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config';
import { map } from 'rxjs/operators';
import { PodsModel } from './models/pods-model';
import { Observable } from 'rxjs';
import { SmdpModel } from './models/smdp-model';
import { SmcpModel } from './models/smcp-model';

@Injectable({
  providedIn: 'root'
})
export class KubernetesService {

  constructor(
    private http: HttpClient
  ) { }

  public loadPods(isPublic: boolean): Observable<PodsModel[]> {
    const restUrl = isPublic ? AppConfig.REST_K_PUBLIC_BASE_URL : AppConfig.REST_K_ENTERPRISE_BASE_URL;

    return this.http.get<PodsModel>(restUrl + AppConfig.API_VERSION + '/pods').pipe(
      map(res => this.extractPodsData(res))
    );
  }

  private extractPodsData(data: any): PodsModel[] {
    const arr: PodsModel[] = [];

    data.items.forEach(item => {
      const obj = {
        name: item.metadata.name,
        namespace: item.metadata.namespace,
        ip: item.status.podIP
      };

      arr.push(new PodsModel(obj));
    });

    return arr;
  }

  public loadSMDP(isPublic: boolean) {
    const restUrl = isPublic ? AppConfig.REST_K_PUBLIC_BASE_URL : AppConfig.REST_K_ENTERPRISE_BASE_URL;

    return this.http.get<SmdpModel>(restUrl + AppConfig.API_VERSION + '/pods').pipe(
      map(res => this.extractSMDPData(res))
    );
  }

  private extractSMDPData(data: any): SmdpModel[] {
    const arr: SmdpModel[] = [];

    data.items.forEach(item => {
      if (item.spec.containers.length > 1) {
        const obj = {
          cname: item.spec.containers[0].name,
          sidecar: item.spec.containers[0].name + ' sidecar'
        };

        arr.push(new SmdpModel(obj));
      }
    });

    return arr;
  }

  public loadSMCP(isPublic: boolean) {
    const restUrl = isPublic ? AppConfig.REST_K_PUBLIC_BASE_URL : AppConfig.REST_K_ENTERPRISE_BASE_URL;

    return this.http.get<SmcpModel>(restUrl + AppConfig.API_VERSION + '/namespaces/istio-system/pods').pipe(
      map(res => this.extractSMCPData(res))
    );
  }

  private extractSMCPData(data: any): SmcpModel[] {
    const arr: SmcpModel[] = [];

    data.items.forEach(item => {
      const obj = {
        podName: item.metadata.name,
        ip: item.status.podIP
      };

      arr.push(new SmcpModel(obj));
    });

    return arr;
  }

  public loadKubernetes(isPublic: boolean) {
    const restUrl = isPublic ? AppConfig.REST_K_PUBLIC_BASE_URL : AppConfig.REST_K_ENTERPRISE_BASE_URL;

    return this.http.get<SmcpModel>(restUrl + AppConfig.API_VERSION + '/namespaces/kube-system/pods').pipe(
      map(res => this.extractSMCPData(res))
    );
  }

  public loadZB(isPublic: boolean) {
    const restUrl = isPublic ? AppConfig.REST_K_PUBLIC_BASE_URL : AppConfig.REST_K_ENTERPRISE_BASE_URL;

    return this.http.get<SmcpModel>(restUrl + AppConfig.API_VERSION + '/namespaces/blockchain/pods').pipe(
      map(res => this.extractSMCPData(res))
    );
  }

  public startZipkinPoll(isPublic: boolean) {
    const restUrl = isPublic ? AppConfig.REST_M_PUBLIC_BASE_URL : AppConfig.REST_M_ENTERPRISE_BASE_URL;

    const body = {
      name: AppConfig.TRACE_NAME,
      address: AppConfig.ADDRESS_E
    };

    this.http.post(restUrl + '/zipkin_poll_start', body).subscribe(
      res => {},
      error => {}
    );
  }

  public stopZipkinPoll(isPublic: boolean) {
    const restUrl = isPublic ? AppConfig.REST_M_PUBLIC_BASE_URL : AppConfig.REST_M_ENTERPRISE_BASE_URL;

    const body = {
      name: AppConfig.TRACE_NAME,
      address: AppConfig.ADDRESS_E
    };

    this.http.post(restUrl + '/zipkin_poll_stop', body).subscribe(
      res => {},
      error => {}
    );
  }

}
