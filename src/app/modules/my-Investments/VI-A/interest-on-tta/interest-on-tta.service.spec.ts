import { TestBed } from '@angular/core/testing';

import { InterestOnTtaService } from './interest-on-tta.service';

describe('InterestOnTtaService', () => {
  let service: InterestOnTtaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestOnTtaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
