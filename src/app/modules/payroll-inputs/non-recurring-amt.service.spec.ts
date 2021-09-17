import { TestBed } from '@angular/core/testing';

import { NonRecurringAmtService } from './non-recurring-amt.service';

describe('NonRecurringAmtService', () => {
  let service: NonRecurringAmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonRecurringAmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
