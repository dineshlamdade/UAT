import { TestBed } from '@angular/core/testing';

import { PrincipalRepaymentOnHousingLoanService } from './principal-repayment-on-housing-loan.service';

describe('PrincipalRepaymentOnHousingLoanService', () => {
  let service: PrincipalRepaymentOnHousingLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrincipalRepaymentOnHousingLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
