import { TestBed } from '@angular/core/testing';

import { PayRollSkipImportService } from './pay-roll--skip-import.service';

describe('PayRollSkipImportService', () => {
  let service: PayRollSkipImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayRollSkipImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
