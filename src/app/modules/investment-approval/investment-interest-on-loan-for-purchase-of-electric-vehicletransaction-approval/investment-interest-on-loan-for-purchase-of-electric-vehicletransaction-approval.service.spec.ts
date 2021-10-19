import { TestBed } from '@angular/core/testing';

import { InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalService } from './investment-interest-on-loan-for-purchase-of-electric-vehicletransaction-approval.service';

describe('InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalService', () => {
  let service: InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
