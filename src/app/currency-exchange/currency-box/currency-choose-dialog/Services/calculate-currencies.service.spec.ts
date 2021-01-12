import { TestBed } from '@angular/core/testing';

import { CalculateCurrenciesService } from './calculate-currencies.service';

describe('CalculateCurrenciesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculateCurrenciesService = TestBed.get(CalculateCurrenciesService);
    expect(service).toBeTruthy();
  });
});
