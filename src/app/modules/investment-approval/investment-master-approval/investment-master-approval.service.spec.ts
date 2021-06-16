import { TestBed } from '@angular/core/testing';

import { InvestmentMasterApprovalService } from './investment-master-approval.service';

describe('InvestmentMasterApprovalService', () => {
  let service: InvestmentMasterApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentMasterApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
