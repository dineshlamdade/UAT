import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricVehicleMasterComponent } from './electric-vehicle-master.component';

describe('ElectricVehicleMasterComponent', () => {
  let component: ElectricVehicleMasterComponent;
  let fixture: ComponentFixture<ElectricVehicleMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricVehicleMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricVehicleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
