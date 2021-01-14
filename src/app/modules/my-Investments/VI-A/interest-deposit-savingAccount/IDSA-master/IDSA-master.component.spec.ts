/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IDSAMasterComponent } from './IDSA-master.component';

describe('IDSAMasterComponent', () => {
  let component: IDSAMasterComponent;
  let fixture: ComponentFixture<IDSAMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDSAMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDSAMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
