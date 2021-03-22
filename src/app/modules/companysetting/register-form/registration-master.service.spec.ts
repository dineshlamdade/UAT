import { TestBed } from '@angular/core/testing';

import { RegistrationMasterService } from './registration-master.service';

describe('RegistrationMasterService', () => {
  let service: RegistrationMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
