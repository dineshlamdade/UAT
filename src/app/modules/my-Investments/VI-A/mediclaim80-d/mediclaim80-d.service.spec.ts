import { TestBed } from '@angular/core/testing';

import { Mediclaim80DService } from './mediclaim80-d.service';

describe('Mediclaim80DService', () => {
  let service: Mediclaim80DService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mediclaim80DService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
