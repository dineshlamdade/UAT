import { TestBed } from '@angular/core/testing';

import { BankMasterAtGroupService } from './bank-master-at-group.service';

describe('BankMasterAtGroupService', () => {
  let service: BankMasterAtGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankMasterAtGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
