import { TestBed, inject } from '@angular/core/testing';

import { BlockListDetailService } from './block-list-detail.service';

describe('BlockListDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockListDetailService]
    });
  });

  it('should be created', inject([BlockListDetailService], (service: BlockListDetailService) => {
    expect(service).toBeTruthy();
  }));
});
