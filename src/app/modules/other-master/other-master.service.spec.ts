/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OtherMasterService } from './other-master.service';

describe('Service: OtherMaster', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtherMasterService]
    });
  });

  it('should ...', inject([OtherMasterService], (service: OtherMasterService) => {
    expect(service).toBeTruthy();
  }));
});
