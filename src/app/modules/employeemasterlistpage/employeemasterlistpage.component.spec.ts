import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeemasterlistpageComponent } from './employeemasterlistpage.component';

describe('EmployeemasterlistpageComponent', () => {
  let component: EmployeemasterlistpageComponent;
  let fixture: ComponentFixture<EmployeemasterlistpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeemasterlistpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemasterlistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
