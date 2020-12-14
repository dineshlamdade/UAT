import { TestBed } from '@angular/core/testing';

import { ContactInformationService } from './contact-information.service';

describe('ContactInformationService', () => {
  let service: ContactInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
