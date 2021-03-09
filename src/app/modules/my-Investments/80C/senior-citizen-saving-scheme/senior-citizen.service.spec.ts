import { TestBed } from '@angular/core/testing';

import { SeniorCitizenService } from './senior-citizen.service';

describe('SeniorCitizenService', () => {
  let service: SeniorCitizenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeniorCitizenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
