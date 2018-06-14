import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tier1Component } from './tier1.component';

describe('Tier1Component', () => {
  let component: Tier1Component;
  let fixture: ComponentFixture<Tier1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tier1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tier1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
