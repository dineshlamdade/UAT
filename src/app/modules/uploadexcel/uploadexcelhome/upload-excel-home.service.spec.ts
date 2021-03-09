import { TestBed } from '@angular/core/testing';

import { UploadExcelHomeService } from './upload-excel-home.service';

describe('UploadExcelHomeService', () => {
  let service: UploadExcelHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadExcelHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
