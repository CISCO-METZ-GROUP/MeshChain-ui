import { Component, OnInit, OnDestroy } from '@angular/core';
import { KubernetesService } from '../shared/kubernetes.service';
import { MatTabChangeEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { PodsModel } from '../shared/models/pods-model';
import { SmdpModel } from '../shared/models/smdp-model';
import { SmcpModel } from '../shared/models/smcp-model';

@Component({
  selector: 'app-enterprise-mesh',
  templateUrl: './enterprise-mesh.component.html',
  styleUrls: ['./enterprise-mesh.component.css']
})
export class EnterpriseMeshComponent implements OnInit, OnDestroy {

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

  constructor(
    private kubernetesService: KubernetesService
  ) { }

  ngOnInit() {
    this.podsLoading = true;

    this.podsSubscription = this.kubernetesService.loadPods(false).subscribe(
      res => {
        this.pods = res;
        this.sortedPods = res.slice();
        this.podsLoading = false;
      }
    );
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

  private loadSMDP() {
    if (this.smdpSubscription) {
      return;
    }

    this.smdpLoading = true;
    this.smdpSubscription = this.kubernetesService.loadSMDP(false).subscribe(
      res => {
        this.smdp = res;
        this.sortedSmdp = res.slice();
        this.smdpLoading = false;
      }
    );
  }

  private loadSMCP() {
    if (this.smcpSubscription) {
      return;
    }

    this.smcpLoading = true;
    this.smcpSubscription = this.kubernetesService.loadSMCP(false).subscribe(
      res => {
        this.smcp = res;
        this.sortedSmcp = res.slice();
        this.smcpLoading = false;
      }
    );
  }

  private loadKubernetes() {
    if (this.kubernetesSubscription) {
      return;
    }

    this.kubernetesLoading = true;
    this.kubernetesSubscription = this.kubernetesService.loadKubernetes(false).subscribe(
      res => {
        this.kubernetes = res;
        this.sortedKubernetes = res.slice();
        this.kubernetesLoading = false;
      }
    );
  }

  private loadZB() {
    if (this.zbSubscription) {
      return;
    }

    this.zbLoading = true;
    this.zbSubscription = this.kubernetesService.loadKubernetes(false).subscribe(
      res => {
        this.zb = res;
        this.sortedZb = res.slice();
        this.zbLoading = false;
      }
    );
  }

  public onTabChange(e: MatTabChangeEvent) {
    switch (e.index) {
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

  public sortData() {

  }

}
