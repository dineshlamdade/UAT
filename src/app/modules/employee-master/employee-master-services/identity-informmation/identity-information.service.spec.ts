import { TestBed } from '@angular/core/testing';

import { IdentityInformationService } from './identity-information.service';

describe('IdentityInformationService', () => {
  let service: IdentityInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
