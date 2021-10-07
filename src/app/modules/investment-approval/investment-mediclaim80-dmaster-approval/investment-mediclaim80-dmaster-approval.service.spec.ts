import { TestBed } from '@angular/core/testing';

import { InvestmentMediclaim80DMasterApprovalService } from './investment-mediclaim80-dmaster-approval.service';

describe('InvestmentMediclaim80DMasterApprovalService', () => {
  let service: InvestmentMediclaim80DMasterApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentMediclaim80DMasterApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
