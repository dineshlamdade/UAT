import { TestBed } from '@angular/core/testing';

import { InvestmentInterestOnEducationalLoantransactionApprovalService } from './investment-interest-on-educational-loantransaction-approval.service';

describe('InvestmentInterestOnEducationalLoantransactionApprovalService', () => {
  let service: InvestmentInterestOnEducationalLoantransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentInterestOnEducationalLoantransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
