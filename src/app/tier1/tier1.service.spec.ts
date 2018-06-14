import { TestBed, inject } from '@angular/core/testing';

import { Tier1Service } from './tier1.service';

describe('Tier1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Tier1Service]
    });
  });

  it('should be created', inject([Tier1Service], (service: Tier1Service) => {
    expect(service).toBeTruthy();
  }));
});
