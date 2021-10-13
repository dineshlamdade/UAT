import { TestBed } from '@angular/core/testing';

import { InvestmentHouserenttransactionApprovalService } from './investment-houserenttransaction-approval.service';

describe('InvestmentHouserenttransactionApprovalService', () => {
  let service: InvestmentHouserenttransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentHouserenttransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
