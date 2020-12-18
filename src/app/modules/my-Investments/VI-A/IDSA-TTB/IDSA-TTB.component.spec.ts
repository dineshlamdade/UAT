/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IDSATTBComponent } from './IDSA-TTB.component';

describe('IDSATTBComponent', () => {
  let component: IDSATTBComponent;
  let fixture: ComponentFixture<IDSATTBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDSATTBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDSATTBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
