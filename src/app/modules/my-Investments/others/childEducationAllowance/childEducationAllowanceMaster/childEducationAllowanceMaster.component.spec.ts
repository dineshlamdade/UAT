/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChildEducationAllowanceMasterComponent } from './childEducationAllowanceMaster.component';

describe('ChildEducationAllowanceMasterComponent', () => {
  let component: ChildEducationAllowanceMasterComponent;
  let fixture: ComponentFixture<ChildEducationAllowanceMasterComponent>;

  beforeEach(async(() => {
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
