import { TestBed } from '@angular/core/testing';

import { InvestmentTransactionApprovalService } from './investment-transaction-approval.service';

describe('InvestmentTransactionApprovalService', () => {
  let service: InvestmentTransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentTransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
