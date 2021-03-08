/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChildEducationAllowanceSummaryComponent } from './childEducationAllowanceSummary.component';

describe('ChildEducationAllowanceSummaryComponent', () => {
  let component: ChildEducationAllowanceSummaryComponent;
  let fixture: ComponentFixture<ChildEducationAllowanceSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildEducationAllowanceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildEducationAllowanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
