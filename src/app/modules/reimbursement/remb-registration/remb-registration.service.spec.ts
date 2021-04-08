import { TestBed } from '@angular/core/testing';

import { RembRegistrationService } from './remb-registration.service';

describe('RembRegistrationService', () => {
  let service: RembRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RembRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
