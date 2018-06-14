import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMeshComponent } from './public-mesh.component';

describe('PublicMeshComponent', () => {
  let component: PublicMeshComponent;
  let fixture: ComponentFixture<PublicMeshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicMeshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicMeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
