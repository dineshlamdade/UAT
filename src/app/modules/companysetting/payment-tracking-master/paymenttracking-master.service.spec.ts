import { TestBed } from '@angular/core/testing';

import { PaymenttrackingMasterService } from './paymenttracking-master.service';

describe('PaymenttrackingMasterService', () => {
  let service: PaymenttrackingMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymenttrackingMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
