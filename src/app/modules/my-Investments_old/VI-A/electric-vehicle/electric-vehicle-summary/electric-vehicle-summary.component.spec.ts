<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

import { ElectricVehicleSummaryComponent } from './electric-vehicle-summary.component';

describe('ElectricVehicleSummaryComponent', () => {
  let component: ElectricVehicleSummaryComponent;
  let fixture: ComponentFixture<ElectricVehicleSummaryComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
=======
  beforeEach(waitForAsync(() => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
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
