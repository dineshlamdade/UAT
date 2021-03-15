<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

import { TreatmentOfSpecifiedSummaryComponent } from './treatment-of-specified-summary.component';

describe('TreatmentOfSpecifiedSummaryComponent', () => {
  let component: TreatmentOfSpecifiedSummaryComponent;
  let fixture: ComponentFixture<TreatmentOfSpecifiedSummaryComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
=======
  beforeEach(waitForAsync(() => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    TestBed.configureTestingModule({
      declarations: [ TreatmentOfSpecifiedSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentOfSpecifiedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
