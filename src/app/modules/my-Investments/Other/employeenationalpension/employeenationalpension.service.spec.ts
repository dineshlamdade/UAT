/* tslint:disable:no-unused-variable */

/* import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeenationalpensionService } from './employeenationalpension.service';

describe('Service: Employeenationalpension', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeenationalpensionService]
    });
  });

  it('should ...', inject([EmployeenationalpensionService], (service: EmployeenationalpensionService) => {
    expect(service).toBeTruthy();
  }));
});
 */
import { TestBed } from '@angular/core/testing';

import { EmployeenationalpensionService } from './employeenationalpension.service';

describe('EmployeenationalpensionService', () => {
  let service: EmployeenationalpensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeenationalpensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

