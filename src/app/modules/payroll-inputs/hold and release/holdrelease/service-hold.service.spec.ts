import { TestBed } from '@angular/core/testing';

import { ServiceHoldService } from './service-hold.service';

describe('ServiceHoldService', () => {
  let service: ServiceHoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceHoldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
