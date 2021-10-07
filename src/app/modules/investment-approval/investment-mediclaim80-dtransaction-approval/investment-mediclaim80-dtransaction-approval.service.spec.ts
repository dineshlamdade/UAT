import { TestBed } from '@angular/core/testing';

import { InvestmentMediclaim80DtransactionApprovalService } from './investment-mediclaim80-dtransaction-approval.service';

describe('InvestmentMediclaim80DtransactionApprovalService', () => {
  let service: InvestmentMediclaim80DtransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentMediclaim80DtransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
