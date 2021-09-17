import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesetComponent } from './employeeset.component';

describe('EmployeesetComponent', () => {
  let component: EmployeesetComponent;
  let fixture: ComponentFixture<EmployeesetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
