/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChildHostelAllowanceMasterComponent } from './childHostelAllowanceMaster.component';

describe('ChildHostelAllowanceMasterComponent', () => {
  let component: ChildHostelAllowanceMasterComponent;
  let fixture: ComponentFixture<ChildHostelAllowanceMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildHostelAllowanceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildHostelAllowanceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
