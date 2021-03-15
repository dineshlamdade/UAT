import { TestBed } from '@angular/core/testing';

import { EducationalLoanServiceService } from './educational-loan-service.service';

describe('EducationalLoanServiceService', () => {
  let service: EducationalLoanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalLoanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
