import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.css']
})
export class DashboardWidgetComponent implements OnInit, OnDestroy {

  public isActive: boolean;
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isActive = false;

    this.routeSubscription = this.route.url.subscribe(
      url => {
        if (url[0].path === 'block' || url[0].path === 'business') {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
