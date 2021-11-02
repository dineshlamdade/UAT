import { TestBed } from '@angular/core/testing';

import { InvestmentHousingloantransactionApprovalService } from './investment-housingloantransaction-approval.service';

describe('InvestmentHousingloantransactionApprovalService', () => {
  let service: InvestmentHousingloantransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentHousingloantransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
