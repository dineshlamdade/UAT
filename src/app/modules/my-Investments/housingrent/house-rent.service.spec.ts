import { TestBed } from '@angular/core/testing';

import { HouseRentService } from './house-rent.service';

describe('HouseRentService', () => {
  let service: HouseRentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseRentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
