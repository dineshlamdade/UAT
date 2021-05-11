/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AffirmationService } from './affirmation.service';

describe('Service: Affirmation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AffirmationService]
    });
  });

  it('should ...', inject([AffirmationService], (service: AffirmationService) => {
    expect(service).toBeTruthy();
  }));
});
