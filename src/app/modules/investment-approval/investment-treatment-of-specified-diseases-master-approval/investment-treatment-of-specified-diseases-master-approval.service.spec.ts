import { TestBed } from '@angular/core/testing';

import { InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalService } from './investment-treatment-of-specified-diseases-master-approval.service';

describe('InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalService', () => {
  let service: InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
