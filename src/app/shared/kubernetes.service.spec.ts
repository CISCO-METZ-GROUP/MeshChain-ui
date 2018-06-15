import { TestBed, inject } from '@angular/core/testing';

import { KubernetesService } from './kubernetes.service';

describe('KubernetesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KubernetesService]
    });
  });

  it('should be created', inject([KubernetesService], (service: KubernetesService) => {
    expect(service).toBeTruthy();
  }));
});
