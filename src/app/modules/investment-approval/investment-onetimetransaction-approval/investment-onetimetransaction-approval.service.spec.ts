import { TestBed } from '@angular/core/testing';

import { InvestmentOnetimetransactionApprovalService } from './investment-onetimetransaction-approval.service';

describe('InvestmentOnetimetransactionApprovalService', () => {
  let service: InvestmentOnetimetransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentOnetimetransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
