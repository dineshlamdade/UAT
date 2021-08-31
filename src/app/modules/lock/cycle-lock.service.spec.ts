import { TestBed } from '@angular/core/testing';

import { CycleLockService } from './cycle-lock.service';

describe('CycleLockService', () => {
  let service: CycleLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CycleLockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
