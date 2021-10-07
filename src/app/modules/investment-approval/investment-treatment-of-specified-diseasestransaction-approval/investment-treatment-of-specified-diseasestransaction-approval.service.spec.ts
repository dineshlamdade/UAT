import { TestBed } from '@angular/core/testing';

import { InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalService } from './investment-treatment-of-specified-diseasestransaction-approval.service';

describe('InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalService', () => {
  let service: InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
