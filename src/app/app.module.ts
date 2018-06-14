import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import 'hammerjs';

import { AppComponent } from './app.component';
import { BlockchainModule } from './blockchain/blockchain.module';
import { SharedModule } from './shared/shared.module';

import { CoreService } from './shared/core.service';
import { NotificationService } from './notification/notification.service';
import { SmartContractService } from './smart-contract/smart-contract.service';
import { WebsocketService } from './shared/websocket.service';

import { NavigationComponent } from './navigation/navigation.component';
import { SmartContractComponent } from './smart-contract/smart-contract.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnterpriseMeshComponent } from './enterprise-mesh/enterprise-mesh.component';
import { PublicMeshComponent } from './public-mesh/public-mesh.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'enterprise-mesh', component: EnterpriseMeshComponent },
  { path: 'public-mesh', component: PublicMeshComponent },
  { path: 'smart-contract', component: SmartContractComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SmartContractComponent,
    NotificationComponent,
    DashboardComponent,
    EnterpriseMeshComponent,
    PublicMeshComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ClarityModule,
    SharedModule,
    BlockchainModule,
    FormsModule
  ],
  entryComponents: [
  ],
  providers: [
    CoreService,
    NotificationService,
    SmartContractService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
