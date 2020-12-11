import { TestBed } from '@angular/core/testing';

import { ComplianceMasterService } from './compliance-master.service';

describe('ComplianceMasterService', () => {
  let service: ComplianceMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplianceMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
