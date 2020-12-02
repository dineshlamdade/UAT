import { TestBed } from '@angular/core/testing';

import { EstablishmentMasterService } from './establishment-master.service';

describe('EstablishmentMasterService', () => {
  let service: EstablishmentMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstablishmentMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
