import { TestBed } from '@angular/core/testing';

import { HousingloanService } from './housingloan.service';

describe('HousingloanService', () => {
  let service: HousingloanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingloanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
