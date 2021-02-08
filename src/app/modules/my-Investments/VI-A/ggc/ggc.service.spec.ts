import { TestBed } from '@angular/core/testing';

import { GgcService } from './ggc.service';

describe('GgcService', () => {
  let service: GgcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GgcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
