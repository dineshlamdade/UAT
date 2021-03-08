import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnitLinkedInsurancePlanComponent } from './unit-linked-insurance-plan.component';

describe('UnitLinkedInsurancePlanComponent', () => {
  let component: UnitLinkedInsurancePlanComponent;
  let fixture: ComponentFixture<UnitLinkedInsurancePlanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitLinkedInsurancePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitLinkedInsurancePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
