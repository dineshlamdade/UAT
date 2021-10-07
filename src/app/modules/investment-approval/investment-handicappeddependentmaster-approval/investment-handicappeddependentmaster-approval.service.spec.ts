import { TestBed } from '@angular/core/testing';

import { InvestmentHandicappeddependentmasterApprovalService } from './investment-handicappeddependentmaster-approval.service';

describe('InvestmentHandicappeddependentmasterApprovalService', () => {
  let service: InvestmentHandicappeddependentmasterApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentHandicappeddependentmasterApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
