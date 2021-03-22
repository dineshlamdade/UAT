import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollInputsComponent } from './payroll-inputs.component';

describe('PayrollInputsComponent', () => {
  let component: PayrollInputsComponent;
  let fixture: ComponentFixture<PayrollInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
