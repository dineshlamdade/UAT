import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { payrollComponent } from './bc.component';

describe('payrollComponent', () => {
  let component: payrollComponent;
  let fixture: ComponentFixture<payrollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ payrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(payrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
