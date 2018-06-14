import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardWidgetComponent } from '../dashboard/dashboard-widget/dashboard-widget.component';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Tier1Component } from '../tier1/tier1.component';
import { OemComponent } from '../oem/oem.component';
import { SmartContractComponent } from '../smart-contract/smart-contract.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tier1', component: Tier1Component },
  { path: 'oem', component: OemComponent },
  { path: 'smart-contract', component: SmartContractComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DashboardWidgetComponent
  ],
  declarations: [
    DashboardWidgetComponent
  ]
})
export class SharedModule { }
