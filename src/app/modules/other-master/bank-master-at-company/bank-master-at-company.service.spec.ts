import { TestBed } from '@angular/core/testing';

import { BankMasterAtCompanyService } from './bank-master-at-company.service';

describe('BankMasterAtCompanyService', () => {
  let service: BankMasterAtCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankMasterAtCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
