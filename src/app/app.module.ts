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
import { Tier1Component } from './tier1/tier1.component';
import { OemComponent } from './oem/oem.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tier1', component: Tier1Component },
  { path: 'oem', component: OemComponent },
  { path: 'smart-contract', component: SmartContractComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SmartContractComponent,
    NotificationComponent,
    DashboardComponent,
    Tier1Component,
    OemComponent
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
