import { TestBed } from '@angular/core/testing';

import { OtherincomedeclarationService } from './otherincomedeclaration.service';

describe('OtherincomedeclarationService', () => {
  let service: OtherincomedeclarationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherincomedeclarationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
