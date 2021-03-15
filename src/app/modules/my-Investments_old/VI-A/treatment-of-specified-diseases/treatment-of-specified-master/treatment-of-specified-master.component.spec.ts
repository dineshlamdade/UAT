<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

import { TreatmentOfSpecifiedMasterComponent } from './treatment-of-specified-master.component';

describe('TreatmentOfSpecifiedMasterComponent', () => {
  let component: TreatmentOfSpecifiedMasterComponent;
  let fixture: ComponentFixture<TreatmentOfSpecifiedMasterComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
=======
  beforeEach(waitForAsync(() => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    TestBed.configureTestingModule({
      declarations: [ TreatmentOfSpecifiedMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentOfSpecifiedMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
