import { TestBed } from '@angular/core/testing';

import { GetCurrencyService } from './get-currency.service';

describe('GetCurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCurrencyService = TestBed.get(GetCurrencyService);
    expect(service).toBeTruthy();
  });
});
