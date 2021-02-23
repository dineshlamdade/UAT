/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SdmComponent } from './sdm.component';

describe('SdmComponent', () => {
  let component: SdmComponent;
  let fixture: ComponentFixture<SdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
