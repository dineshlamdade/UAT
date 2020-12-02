import { TestBed } from '@angular/core/testing';

import { FixedDepositsService } from './fixed-deposits.service';

describe('FixedDepositsService', () => {
  let service: FixedDepositsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedDepositsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
