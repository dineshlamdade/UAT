import { TestBed } from '@angular/core/testing';

import { HousePropertyService } from './house-property.service';

describe('HousePropertyService', () => {
  let service: HousePropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousePropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
