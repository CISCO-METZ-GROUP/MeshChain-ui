import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockListItemComponent } from './block-list-item.component';

describe('BlockListItemComponent', () => {
  let component: BlockListItemComponent;
  let fixture: ComponentFixture<BlockListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
