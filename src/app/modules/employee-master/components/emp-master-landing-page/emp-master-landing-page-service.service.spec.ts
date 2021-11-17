import { TestBed } from '@angular/core/testing';

import { EmpMasterLandingPageServiceService } from './emp-master-landing-page-service.service';

describe('EmpMasterLandingPageServiceService', () => {
  let service: EmpMasterLandingPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpMasterLandingPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
