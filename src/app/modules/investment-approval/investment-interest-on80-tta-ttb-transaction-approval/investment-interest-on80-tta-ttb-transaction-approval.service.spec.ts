import { TestBed } from '@angular/core/testing';

import { InvestmentInterestOn80TTATTBTransactionApprovalService } from './investment-interest-on80-tta-ttb-transaction-approval.service';

describe('InvestmentInterestOn80TTATTBTransactionApprovalService', () => {
  let service: InvestmentInterestOn80TTATTBTransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentInterestOn80TTATTBTransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
