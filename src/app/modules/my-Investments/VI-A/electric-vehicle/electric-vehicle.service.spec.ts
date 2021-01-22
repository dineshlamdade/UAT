import { TestBed } from '@angular/core/testing';

import { ElectricVehicleService } from './electric-vehicle.service';

describe('ElectricVehicleService', () => {
  let service: ElectricVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectricVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
