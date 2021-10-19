import { TestBed } from '@angular/core/testing';

import { InvestmentHousingLoanMasterApprovalService } from './investment-housing-loan-master-approval.service';

describe('InvestmentHousingLoanMasterApprovalService', () => {
  let service: InvestmentHousingLoanMasterApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentHousingLoanMasterApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
