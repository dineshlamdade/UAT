import { TestBed } from '@angular/core/testing';

import { GgaService } from './gga.service';

describe('GgaService', () => {
  let service: GgaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GgaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
