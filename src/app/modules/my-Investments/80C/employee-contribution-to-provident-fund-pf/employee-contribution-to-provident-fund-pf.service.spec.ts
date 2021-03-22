import { TestBed } from '@angular/core/testing';

import { EmployeeContributionToProvidentFundPFService } from './employee-contribution-to-provident-fund-pf.service';

describe('EmployeeContributionToProvidentFundPFService', () => {
  let service: EmployeeContributionToProvidentFundPFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeContributionToProvidentFundPFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
