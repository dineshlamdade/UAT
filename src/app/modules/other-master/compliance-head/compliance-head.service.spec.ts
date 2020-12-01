import { TestBed } from '@angular/core/testing';

import { ComplianceHeadService } from './compliance-head.service';

describe('ComplianceHeadService', () => {
  let service: ComplianceHeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplianceHeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
