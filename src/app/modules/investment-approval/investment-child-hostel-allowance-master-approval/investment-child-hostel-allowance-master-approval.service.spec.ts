import { TestBed } from '@angular/core/testing';

import { InvestmentChildHostelAllowanceMasterApprovalService } from './investment-child-hostel-allowance-master-approval.service';

describe('InvestmentChildHostelAllowanceMasterApprovalService', () => {
  let service: InvestmentChildHostelAllowanceMasterApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentChildHostelAllowanceMasterApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
