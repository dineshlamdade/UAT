import { TestBed } from '@angular/core/testing';

import { KeywordserviceService } from './keywordservice.service';

describe('KeywordserviceService', () => {
  let service: KeywordserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeywordserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
