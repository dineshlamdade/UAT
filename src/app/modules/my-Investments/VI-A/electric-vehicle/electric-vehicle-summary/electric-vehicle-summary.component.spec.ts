import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElectricVehicleSummaryComponent } from './electric-vehicle-summary.component';

describe('ElectricVehicleSummaryComponent', () => {
  let component: ElectricVehicleSummaryComponent;
  let fixture: ComponentFixture<ElectricVehicleSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricVehicleSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricVehicleSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
