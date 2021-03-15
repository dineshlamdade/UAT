/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { LmsService } from './lms.service';

describe('Service: Lms', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LmsService]
    });
  });

  it('should ...', inject([LmsService], (service: LmsService) => {
    expect(service).toBeTruthy();
  }));
});
