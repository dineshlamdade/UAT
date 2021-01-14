/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IDSADeclarationComponent } from './IDSA-declaration.component';

describe('IDSADeclarationComponent', () => {
  let component: IDSADeclarationComponent;
  let fixture: ComponentFixture<IDSADeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IDSADeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IDSADeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
