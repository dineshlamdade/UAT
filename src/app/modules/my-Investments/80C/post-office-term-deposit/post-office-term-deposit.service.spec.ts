import { TestBed } from '@angular/core/testing';

import { PostOfficeTermDepositService } from './post-office-term-deposit.service';

describe('PostOfficeTermDepositService', () => {
  let service: PostOfficeTermDepositService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostOfficeTermDepositService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
