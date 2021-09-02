import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdmStepperComponent } from './sdm-stepper.component';

describe('SdmStepperComponent', () => {
  let component: SdmStepperComponent;
  let fixture: ComponentFixture<SdmStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdmStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
