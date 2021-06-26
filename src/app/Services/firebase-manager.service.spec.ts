import { TestBed } from '@angular/core/testing';

import { FirebaseManagerService } from './firebase-manager.service';

describe('FirebaseManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseManagerService = TestBed.get(FirebaseManagerService);
    expect(service).toBeTruthy();
  });
});
