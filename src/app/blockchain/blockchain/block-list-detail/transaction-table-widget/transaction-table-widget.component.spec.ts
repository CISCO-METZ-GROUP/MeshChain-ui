import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTableWidgetComponent } from './transaction-table-widget.component';

describe('TransactionTableWidgetComponent', () => {
  let component: TransactionTableWidgetComponent;
  let fixture: ComponentFixture<TransactionTableWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTableWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTableWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
