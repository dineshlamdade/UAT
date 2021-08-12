import { TestBed } from '@angular/core/testing';

import { OnetimeInvestmentsTransactionApprovalService } from './onetime-investments-transaction-approval.service';

describe('OnetimeInvestmentsTransactionApprovalService', () => {
  let service: OnetimeInvestmentsTransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnetimeInvestmentsTransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
