import { TestBed } from '@angular/core/testing';

import { SdnCreationService } from './sdn-creation.service';

describe('SdnCreationService', () => {
  let service: SdnCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdnCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
