import { TestBed } from '@angular/core/testing';

import { FindValueService } from './find-value.service';

describe('FindValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindValueService = TestBed.get(FindValueService);
    expect(service).toBeTruthy();
  });
});
