import { TestBed } from '@angular/core/testing';

import { InvestmentApprovalService } from './investment-approval.service';

describe('InvestmentApprovalService', () => {
  let service: InvestmentApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
