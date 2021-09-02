import { TestBed } from '@angular/core/testing';

import { NonRecurringQtyService } from './non-recurring-qty.service';

describe('NonRecurringQtyService', () => {
  let service: NonRecurringQtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonRecurringQtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
