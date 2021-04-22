import { TestBed } from '@angular/core/testing';

import { OtherincomesummaryService } from './otherincomesummary.service';

describe('OtherincomesummaryService', () => {
  let service: OtherincomesummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherincomesummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
