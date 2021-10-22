import { TestBed } from '@angular/core/testing';

import { InvestmentHouserentmasterApprovalService } from './investment-houserentmaster-approval.service';

describe('InvestmentHouserentmasterApprovalService', () => {
  let service: InvestmentHouserentmasterApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentHouserentmasterApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
