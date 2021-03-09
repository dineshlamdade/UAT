import { TestBed } from '@angular/core/testing';

import { TreatmentOfSpecifiedService } from './treatment-of-specified.service';

describe('TreatmentOfSpecifiedService', () => {
  let service: TreatmentOfSpecifiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentOfSpecifiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
