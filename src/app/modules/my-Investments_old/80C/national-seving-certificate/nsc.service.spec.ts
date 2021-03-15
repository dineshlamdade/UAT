import { TestBed } from '@angular/core/testing';

import { NscService } from './nsc.service';

describe('NscService', () => {
  let service: NscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
