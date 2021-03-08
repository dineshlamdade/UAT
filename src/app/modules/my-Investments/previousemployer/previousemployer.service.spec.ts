/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreviousemployerService } from './previousemployer.service';

describe('Service: Previousemployer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreviousemployerService]
    });
  });

  it('should ...', inject([PreviousemployerService], (service: PreviousemployerService) => {
    expect(service).toBeTruthy();
  }));
});
