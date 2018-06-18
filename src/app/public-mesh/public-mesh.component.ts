import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTabChangeEvent, Sort, MatSlideToggleChange } from '@angular/material';
import { Subscription } from 'rxjs';
import { PodsModel } from '../shared/models/pods-model';
import { SmdpModel } from '../shared/models/smdp-model';
import { SmcpModel } from '../shared/models/smcp-model';
import { KubernetesService } from '../shared/kubernetes.service';

@Component({
  selector: 'app-public-mesh',
  templateUrl: './public-mesh.component.html',
  styleUrls: ['./public-mesh.component.css']
})
export class PublicMeshComponent implements OnInit, OnDestroy {

  public pods: PodsModel[] = [];
  public sortedPods: PodsModel[] = [];
  public podsLoading: boolean;
  private podsSubscription: Subscription;

  public smdp: SmdpModel[] = [];
  public sortedSmdp: SmdpModel[] = [];
  public smdpLoading: boolean;
  private smdpSubscription: Subscription;

  public smcp: SmcpModel[] = [];
  public sortedSmcp: SmcpModel[] = [];
  public smcpLoading: boolean;
  private smcpSubscription: Subscription;

  public kubernetes: SmcpModel[] = [];
  public sortedKubernetes: SmcpModel[] = [];
  public kubernetesLoading: boolean;
  private kubernetesSubscription: Subscription;

  public zb: SmcpModel[] = [];
  public sortedZb: SmcpModel[] = [];
  public zbLoading: boolean;
  private zbSubscription: Subscription;

  private tabIndex: number;
  private loadPotsForce: boolean;
  private loadSmdpForce: boolean;
  private loadSmcpForce: boolean;
  private loadKubernetesForce: boolean;
  private loadZbForce: boolean;

  constructor(
    private kubernetesService: KubernetesService
  ) { }

  ngOnInit() {
    this.tabIndex = 0;
    this.setForce(false);
    this.loadPods();
  }

  ngOnDestroy() {
    if (this.podsSubscription) {
      this.podsSubscription.unsubscribe();
    }

    if (this.smdpSubscription) {
      this.smdpSubscription.unsubscribe();
    }

    if (this.smcpSubscription) {
      this.smcpSubscription.unsubscribe();
    }

    if (this.kubernetesSubscription) {
      this.kubernetesSubscription.unsubscribe();
    }

    if (this.zbSubscription) {
      this.zbSubscription.unsubscribe();
    }
  }

  private setForce(state: boolean) {
    this.loadPotsForce = state;
    this.loadSmdpForce = state;
    this.loadSmcpForce = state;
    this.loadKubernetesForce = state;
    this.loadZbForce = state;
  }

  private loadPods() {
    if (this.podsSubscription && !this.loadPotsForce) {
      return;
    }

    this.loadPotsForce = false;
    this.podsLoading = true;
    this.podsSubscription = this.kubernetesService.loadPods(true).subscribe(
      res => {
        this.pods = res;
        this.sortedPods = res.slice();
        this.podsLoading = false;
      }
    );
  }

  private loadSMDP() {
    if (this.smdpSubscription && !this.loadSmdpForce) {
      return;
    }

    this.loadSmdpForce = false;
    this.smdpLoading = true;
    this.smdpSubscription = this.kubernetesService.loadSMDP(true).subscribe(
      res => {
        this.smdp = res;
        this.sortedSmdp = res.slice();
        this.smdpLoading = false;
      }
    );
  }

  private loadSMCP() {
    if (this.smcpSubscription && !this.loadSmcpForce) {
      return;
    }

    this.loadSmcpForce = false;
    this.smcpLoading = true;
    this.smcpSubscription = this.kubernetesService.loadSMCP(true).subscribe(
      res => {
        this.smcp = res;
        this.sortedSmcp = res.slice();
        this.smcpLoading = false;
      }
    );
  }

  private loadKubernetes() {
    if (this.kubernetesSubscription && !this.loadKubernetesForce) {
      return;
    }

    this.loadKubernetesForce = false;
    this.kubernetesLoading = true;
    this.kubernetesSubscription = this.kubernetesService.loadKubernetes(true).subscribe(
      res => {
        this.kubernetes = res;
        this.sortedKubernetes = res.slice();
        this.kubernetesLoading = false;
      }
    );
  }

  private loadZB() {
    if (this.zbSubscription && !this.loadZbForce) {
      return;
    }

    this.loadZbForce = false;
    this.zbLoading = true;
    this.zbSubscription = this.kubernetesService.loadKubernetes(true).subscribe(
      res => {
        this.zb = res;
        this.sortedZb = res.slice();
        this.zbLoading = false;
      }
    );
  }

  public onTabChange(e: MatTabChangeEvent) {
    this.tabIndex = e.index;

    switch (e.index) {
      case 0:
        this.loadPods();
        break;
      case 1:
        this.loadSMDP();
        break;
      case 2:
        this.loadSMCP();
        break;
      case 3:
        this.loadKubernetes();
        break;
      case 4:
        this.loadZB();
        break;
    }
  }

  public isLoading(): boolean {
    return this.podsLoading || this.smdpLoading || this.smcpLoading || this.kubernetesLoading || this.zbLoading;
  }

  public sortPodsData(sort: Sort) {
    const data = this.pods.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedPods = data;
      return;
    }

    this.sortedPods = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'namespace': return this.compare(a.namespace, b.namespace, isAsc);
        case 'ip': return this.compare(a.ip, b.ip, isAsc);

        default: return 0;
      }
    });
  }

  public sortSMDPData(sort: Sort) {
    const data = this.smdp.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedSmdp = data;
      return;
    }

    this.sortedSmdp = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'cname': return this.compare(a.cname, b.cname, isAsc);
        case 'sidecar': return this.compare(a.sidecar, b.sidecar, isAsc);

        default: return 0;
      }
    });
  }

  public sortSMCPData(sort: Sort) {
    const data = this.smcp.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedSmcp = data;
      return;
    }

    this.sortedSmcp = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'podName': return this.compare(a.podName, b.podName, isAsc);
        case 'ip': return this.compare(a.ip, b.ip, isAsc);

        default: return 0;
      }
    });
  }

  public sortKubernetesData(sort: Sort) {
    const data = this.kubernetes.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedKubernetes = data;
      return;
    }

    this.sortedKubernetes = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'podName': return this.compare(a.podName, b.podName, isAsc);
        case 'ip': return this.compare(a.ip, b.ip, isAsc);

        default: return 0;
      }
    });
  }

  public sortZBData(sort: Sort) {
    const data = this.zb.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedZb = data;
      return;
    }

    this.sortedZb = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'podName': return this.compare(a.podName, b.podName, isAsc);
        case 'ip': return this.compare(a.ip, b.ip, isAsc);

        default: return 0;
      }
    });
  }

  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public onSliderToggle(e: MatSlideToggleChange) {
    if (e.checked) {
      this.kubernetesService.startZipkinPoll(true);
    } else {
      this.kubernetesService.stopZipkinPoll(true);
    }

    this.setForce(true);
    this.loadActualData();
  }

  private loadActualData() {
    switch (this.tabIndex) {
      case 0:
        this.loadPods();
        break;
      case 1:
        this.loadSMDP();
        break;
      case 2:
        this.loadSMCP();
        break;
      case 3:
        this.loadKubernetes();
        break;
      case 4:
        this.loadZB();
        break;
    }
  }

}
