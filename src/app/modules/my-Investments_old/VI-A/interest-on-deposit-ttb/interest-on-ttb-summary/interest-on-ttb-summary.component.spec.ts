<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

import { InterestOnTtbSummaryComponent } from './interest-on-ttb-summary.component';

describe('InterestOnTtbSummaryComponent', () => {
  let component: InterestOnTtbSummaryComponent;
  let fixture: ComponentFixture<InterestOnTtbSummaryComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
=======
  beforeEach(waitForAsync(() => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    TestBed.configureTestingModule({
      declarations: [ InterestOnTtbSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestOnTtbSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
