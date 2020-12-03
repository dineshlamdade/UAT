import { TestBed } from '@angular/core/testing';

import { CompanyRegistrationDetailsService } from './company-registration-details.service';

describe('CompanyRegistrationDetailsService', () => {
  let service: CompanyRegistrationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyRegistrationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
