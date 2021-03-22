import { TestBed } from '@angular/core/testing';

import { TaxAdjustmentsService } from './tax-adjustments.service';

describe('TaxAdjustmentsService', () => {
  let service: TaxAdjustmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxAdjustmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
