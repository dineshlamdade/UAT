import { TestBed } from '@angular/core/testing';

import { EmployeesNPS80CCD1Service } from './employees-nps80-ccd1.service';

describe('EmployeesNPS80CCD1Service', () => {
  let service: EmployeesNPS80CCD1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesNPS80CCD1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
