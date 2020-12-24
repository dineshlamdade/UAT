import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeemasterlistComponent } from './employeemasterlist.component';

describe('EmployeemasterlistComponent', () => {
  let component: EmployeemasterlistComponent;
  let fixture: ComponentFixture<EmployeemasterlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeemasterlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
