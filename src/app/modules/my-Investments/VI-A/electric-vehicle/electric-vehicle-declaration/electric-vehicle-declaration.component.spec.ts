import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElectricVehicleDeclarationComponent } from './electric-vehicle-declaration.component';

describe('ElectricVehicleDeclarationComponent', () => {
  let component: ElectricVehicleDeclarationComponent;
  let fixture: ComponentFixture<ElectricVehicleDeclarationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricVehicleDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricVehicleDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
