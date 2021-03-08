import { TestBed } from '@angular/core/testing';

import { NationalSavingCertificateNSCAccruedInterestService } from './national-saving-certificate-nsc-accrued-interest.service';

describe('NationalSavingCertificateNSCAccruedInterestService', () => {
  let service: NationalSavingCertificateNSCAccruedInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalSavingCertificateNSCAccruedInterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
