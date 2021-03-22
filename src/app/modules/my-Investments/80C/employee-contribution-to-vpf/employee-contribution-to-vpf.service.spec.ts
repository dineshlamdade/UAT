import { TestBed } from '@angular/core/testing';

import { EmployeeContributionToVPFService } from './employee-contribution-to-vpf.service';

describe('EmployeeContributionToVPFService', () => {
  let service: EmployeeContributionToVPFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeContributionToVPFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
