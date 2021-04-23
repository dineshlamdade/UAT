/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PayrollInputsService } from './payroll-inputs.service';

describe('Service: PayrollInputs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayrollInputsService]
    });
  });

  it('should ...', inject([PayrollInputsService], (service: PayrollInputsService) => {
    expect(service).toBeTruthy();
  }));
});
