import { TestBed } from '@angular/core/testing';

import { InvestmentChildEducationAllowanceMasterApprovalService } from './investment-child-education-allowance-master-approval.service';

describe('InvestmentChildEducationAllowanceMasterApprovalService', () => {
  let service: InvestmentChildEducationAllowanceMasterApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentChildEducationAllowanceMasterApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
