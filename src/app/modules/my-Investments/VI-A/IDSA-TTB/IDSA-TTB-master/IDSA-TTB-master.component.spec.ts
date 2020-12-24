/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IDSATTBMasterComponent } from './IDSA-TTB-master.component';

describe('IDSATTBMasterComponent', () => {
  let component: IDSATTBMasterComponent;
  let fixture: ComponentFixture<IDSATTBMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDSATTBMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDSATTBMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
