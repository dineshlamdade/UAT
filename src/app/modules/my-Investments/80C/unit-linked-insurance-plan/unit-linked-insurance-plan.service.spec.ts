import { TestBed } from '@angular/core/testing';

import { UnitLinkedInsurancePlanService } from './unit-linked-insurance-plan.service';

describe('UnitLinkedInsurancePlanService', () => {
  let service: UnitLinkedInsurancePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitLinkedInsurancePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
