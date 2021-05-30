import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesNPS80CCD1Component } from './employees-nps80-ccd1.component';

describe('EmployeesNPS80CCD1Component', () => {
  let component: EmployeesNPS80CCD1Component;
  let fixture: ComponentFixture<EmployeesNPS80CCD1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesNPS80CCD1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesNPS80CCD1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
