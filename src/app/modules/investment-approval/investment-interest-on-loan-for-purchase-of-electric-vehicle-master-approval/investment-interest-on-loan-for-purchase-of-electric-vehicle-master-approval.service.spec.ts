import { TestBed } from '@angular/core/testing';

import { InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalService } from './investment-interest-on-loan-for-purchase-of-electric-vehicle-master-approval.service';

describe('InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalService', () => {
  let service: InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
