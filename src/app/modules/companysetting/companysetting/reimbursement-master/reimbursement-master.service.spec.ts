import { TestBed } from '@angular/core/testing';

import { ReimbursementMasterService } from './reimbursement-master.service';

describe('ReimbursementMasterService', () => {
  let service: ReimbursementMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReimbursementMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
