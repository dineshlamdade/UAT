/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChildHostelAllowanceSummaryComponent } from './childHostelAllowanceSummary.component';

describe('ChildHostelAllowanceSummaryComponent', () => {
  let component: ChildHostelAllowanceSummaryComponent;
  let fixture: ComponentFixture<ChildHostelAllowanceSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildHostelAllowanceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildHostelAllowanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
