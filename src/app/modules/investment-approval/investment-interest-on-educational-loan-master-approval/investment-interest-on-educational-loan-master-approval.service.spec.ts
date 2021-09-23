import { TestBed } from '@angular/core/testing';

import { InvestmentInterestOnEducationalLoanMasterApprovalService } from './investment-interest-on-educational-loan-master-approval.service';

describe('InvestmentInterestOnEducationalLoanMasterApprovalService', () => {
  let service: InvestmentInterestOnEducationalLoanMasterApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentInterestOnEducationalLoanMasterApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
