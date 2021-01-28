/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanySettingsService } from './company-settings.service';

describe('Service: CompanySettings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanySettingsService]
    });
  });

  it('should ...', inject([CompanySettingsService], (service: CompanySettingsService) => {
    expect(service).toBeTruthy();
  }));
});
