<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

import { TuitionFeesSummaryComponent } from './tuition-fees-summary.component';

describe('TuitionFeesSummaryComponent', () => {
  let component: TuitionFeesSummaryComponent;
  let fixture: ComponentFixture<TuitionFeesSummaryComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
=======
  beforeEach(waitForAsync(() => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    TestBed.configureTestingModule({
      declarations: [ TuitionFeesSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuitionFeesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
