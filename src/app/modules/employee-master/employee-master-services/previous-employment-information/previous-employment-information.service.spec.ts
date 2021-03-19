import { TestBed } from '@angular/core/testing';

import { PreviousEmploymentInformationService } from './previous-employment-information.service';

describe('PreviousEmploymentInformationService', () => {
  let service: PreviousEmploymentInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousEmploymentInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
