/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreviousEmployerService } from '../previousemployer/previousemployer.service';

describe('Service: Previousemployer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreviousEmployerService]
    });
  });

  it('should ...', inject([PreviousEmployerService], (service: PreviousEmployerService) => {
    expect(service).toBeTruthy();
  }));
});
