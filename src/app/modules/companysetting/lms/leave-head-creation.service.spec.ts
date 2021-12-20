import { TestBed } from '@angular/core/testing';

import { LeaveHeadCreationService } from './leave-head-creation.service';

describe('LeaveHeadCreationService', () => {
  let service: LeaveHeadCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveHeadCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
