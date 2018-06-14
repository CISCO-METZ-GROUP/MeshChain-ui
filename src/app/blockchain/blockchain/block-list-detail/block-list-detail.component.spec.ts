import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockListDetailComponent } from './block-list-detail.component';

describe('BlockListDetailComponent', () => {
  let component: BlockListDetailComponent;
  let fixture: ComponentFixture<BlockListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
