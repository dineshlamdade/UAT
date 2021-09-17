import { TestBed } from '@angular/core/testing';

import { GarnishmentService } from './garnishment.service';

describe('GarnishmentService', () => {
  let service: GarnishmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarnishmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
