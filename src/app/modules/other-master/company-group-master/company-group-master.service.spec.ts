import { TestBed } from '@angular/core/testing';

import { CompanyGroupMasterService } from './company-group-master.service';

describe('CompanyGroupMasterService', () => {
  let service: CompanyGroupMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyGroupMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
