import { TestBed } from '@angular/core/testing';

import { TuitionFeesService } from './tuition-fees.service';

describe('TuitionFeesService', () => {
  let service: TuitionFeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuitionFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
