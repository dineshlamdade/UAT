import { TestBed } from '@angular/core/testing';

import { HandicappedDependentService } from './handicapped-dependent.service';

describe('HandicappedDependentService', () => {
  let service: HandicappedDependentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandicappedDependentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
