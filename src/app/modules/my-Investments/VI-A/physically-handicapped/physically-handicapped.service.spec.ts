import { TestBed } from '@angular/core/testing';

import { PhysicallyHandicappedService } from './physically-handicapped.service';

describe('PhysicallyHandicappedService', () => {
  let service: PhysicallyHandicappedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicallyHandicappedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
