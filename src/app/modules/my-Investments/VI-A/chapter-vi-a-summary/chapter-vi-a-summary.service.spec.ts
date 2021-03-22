import { TestBed } from '@angular/core/testing';

import { ChapterVIASummaryService } from './chapter-vi-a-summary.service';

describe('ChapterVIASummaryService', () => {
  let service: ChapterVIASummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterVIASummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
