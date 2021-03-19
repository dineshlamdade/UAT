import { TestBed } from '@angular/core/testing';

import { ChildhostelallowanceService } from './childhostelallowance.service';

describe('ChildhostelallowanceService', () => {
  let service: ChildhostelallowanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildhostelallowanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
