import { TestBed } from '@angular/core/testing';

import { FlexiInputService } from './flexi-input.service';

describe('FlexiInputService', () => {
  let service: FlexiInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlexiInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
