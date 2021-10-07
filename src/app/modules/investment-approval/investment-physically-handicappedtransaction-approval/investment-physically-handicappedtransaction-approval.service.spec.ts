import { TestBed } from '@angular/core/testing';

import { InvestmentPhysicallyHandicappedtransactionApprovalService } from './investment-physically-handicappedtransaction-approval.service';

describe('InvestmentPhysicallyHandicappedtransactionApprovalService', () => {
  let service: InvestmentPhysicallyHandicappedtransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentPhysicallyHandicappedtransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
