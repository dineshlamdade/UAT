import { TestBed } from '@angular/core/testing';

import { RembClaimNontaxService } from './remb-claim-nontax.service';

describe('RembClaimNontaxService', () => {
  let service: RembClaimNontaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RembClaimNontaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
