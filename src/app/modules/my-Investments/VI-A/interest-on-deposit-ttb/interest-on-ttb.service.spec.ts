import { TestBed } from '@angular/core/testing';

import { InterestOnTtbService } from './interest-on-ttb.service';

describe('InterestOnTtbService', () => {
  let service: InterestOnTtbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestOnTtbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
