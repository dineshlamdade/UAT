import { TestBed } from '@angular/core/testing';

import { StatuatoryComplianceService } from './statuatory-compliance.service';

describe('StatuatoryComplianceService', () => {
  let service: StatuatoryComplianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatuatoryComplianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
