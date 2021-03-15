/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChildEducationAllowanceMasterComponent } from './childEducationAllowanceMaster.component';

describe('ChildEducationAllowanceMasterComponent', () => {
  let component: ChildEducationAllowanceMasterComponent;
  let fixture: ComponentFixture<ChildEducationAllowanceMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildEducationAllowanceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildEducationAllowanceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
