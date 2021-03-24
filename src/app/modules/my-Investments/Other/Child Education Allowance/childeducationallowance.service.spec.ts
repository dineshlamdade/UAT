import { TestBed } from '@angular/core/testing';

import { ChildeducationallowanceService } from './childeducationallowance.service';

describe('ChildeducationallowanceService', () => {
  let service: ChildeducationallowanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildeducationallowanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
