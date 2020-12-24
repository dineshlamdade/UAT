/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChildHostelAllowanceComponent } from './child-hostel-allowance.component';

describe('ChildHostelAllowanceComponent', () => {
  let component: ChildHostelAllowanceComponent;
  let fixture: ComponentFixture<ChildHostelAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildHostelAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildHostelAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
