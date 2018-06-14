import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseMeshComponent } from './enterprise-mesh.component';

describe('EnterpriseMeshComponent', () => {
  let component: EnterpriseMeshComponent;
  let fixture: ComponentFixture<EnterpriseMeshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseMeshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseMeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
