import { TestBed } from '@angular/core/testing';

import { InvestmentDonationsForScientificResearchGGAtransactionApprovalService } from './investment-donations-ggatransaction-approval.service';

describe('InvestmentDonationsForScientificResearchGGAtransactionApprovalService', () => {
  let service: InvestmentDonationsForScientificResearchGGAtransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentDonationsForScientificResearchGGAtransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
