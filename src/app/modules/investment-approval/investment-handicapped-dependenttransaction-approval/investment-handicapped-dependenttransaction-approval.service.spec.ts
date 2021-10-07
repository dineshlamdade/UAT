import { TestBed } from '@angular/core/testing';

import { InvestmentHandicappedDependenttransactionApprovalService } from './investment-handicapped-dependenttransaction-approval.service';

describe('InvestmentHandicappedDependenttransactionApprovalService', () => {
  let service: InvestmentHandicappedDependenttransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentHandicappedDependenttransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
