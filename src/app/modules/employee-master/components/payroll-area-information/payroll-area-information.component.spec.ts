import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PayrollAreaInformationComponent } from './payroll-area-information.component';

describe('PayrollAreaInformationComponent', () => {
  let component: PayrollAreaInformationComponent;
  let fixture: ComponentFixture<PayrollAreaInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollAreaInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAreaInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
