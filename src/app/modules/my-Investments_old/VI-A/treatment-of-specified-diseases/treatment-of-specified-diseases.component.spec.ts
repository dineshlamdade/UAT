<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

import { TreatmentOfSpecifiedDiseasesComponent } from './treatment-of-specified-diseases.component';

describe('TreatmentOfSpecifiedDiseasesComponent', () => {
  let component: TreatmentOfSpecifiedDiseasesComponent;
  let fixture: ComponentFixture<TreatmentOfSpecifiedDiseasesComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
=======
  beforeEach(waitForAsync(() => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    TestBed.configureTestingModule({
      declarations: [ TreatmentOfSpecifiedDiseasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentOfSpecifiedDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
