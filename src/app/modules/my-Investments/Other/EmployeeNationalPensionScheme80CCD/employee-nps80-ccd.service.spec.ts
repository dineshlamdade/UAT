import { TestBed } from '@angular/core/testing';

import { EmployeeNPS80CCDService } from './employee-nps80-ccd.service';

describe('EmployeeNPS80CCDService', () => {
  let service: EmployeeNPS80CCDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeNPS80CCDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
