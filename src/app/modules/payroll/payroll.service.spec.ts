/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { PayrollService } from './payroll.service';

describe('Service: Payroll', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayrollService]
    });
  });

  it('should ...', inject([PayrollService], (service: PayrollService) => {
    expect(service).toBeTruthy();
  }));
});
