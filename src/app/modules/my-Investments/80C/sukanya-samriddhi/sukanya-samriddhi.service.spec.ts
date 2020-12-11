import { TestBed } from '@angular/core/testing';

import { SukanyaSamriddhiService } from './sukanya-samriddhi.service';

describe('SukanyaSamriddhiService', () => {
  let service: SukanyaSamriddhiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SukanyaSamriddhiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
