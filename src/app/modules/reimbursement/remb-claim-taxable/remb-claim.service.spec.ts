import { TestBed } from '@angular/core/testing';

import { RembClaimService } from './remb-claim.service';

describe('RembClaimService', () => {
  let service: RembClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RembClaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
