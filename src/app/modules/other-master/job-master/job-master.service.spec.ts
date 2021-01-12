import { TestBed } from '@angular/core/testing';

import { JobMasterService } from './job-master.service';

describe('JobMasterService', () => {
  let service: JobMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
