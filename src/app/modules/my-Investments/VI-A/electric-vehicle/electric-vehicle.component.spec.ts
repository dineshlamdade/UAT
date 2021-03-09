import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricVehicleComponent } from './electric-vehicle.component';

describe('ElectricVehicleComponent', () => {
  let component: ElectricVehicleComponent;
  let fixture: ComponentFixture<ElectricVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
