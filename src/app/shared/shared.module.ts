import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardWidgetComponent } from '../dashboard/dashboard-widget/dashboard-widget.component';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SmartContractComponent } from '../smart-contract/smart-contract.component';
import { EnterpriseMeshComponent } from '../enterprise-mesh/enterprise-mesh.component';
import { PublicMeshComponent } from '../public-mesh/public-mesh.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'enterprise-mesh', component: EnterpriseMeshComponent },
  { path: 'public-mesh', component: PublicMeshComponent },
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
