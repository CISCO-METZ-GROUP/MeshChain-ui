import { Component, OnInit } from '@angular/core';
import { CoreService } from './shared/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isWorking: boolean;

  constructor(
    private coreService: CoreService
  ) { }

  ngOnInit() {
    this.isWorking = false;

    this.coreService.isWorkingSubject.subscribe(
      val => this.isWorking = val
    );
  }

}
