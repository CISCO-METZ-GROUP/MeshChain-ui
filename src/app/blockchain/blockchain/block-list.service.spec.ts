import { TestBed, inject } from '@angular/core/testing';

import { BlockListService } from './block-list.service';

describe('BlockListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockListService]
    });
  });

  it('should be created', inject([BlockListService], (service: BlockListService) => {
    expect(service).toBeTruthy();
  }));
});
