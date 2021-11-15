import { TestBed } from '@angular/core/testing';

import { FlexiService } from './flexi.service';

describe('FlexiService', () => {
  let service: FlexiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlexiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
