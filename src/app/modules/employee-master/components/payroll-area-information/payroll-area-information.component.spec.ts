import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAreaInformationComponent } from './payroll-area-information.component';

describe('PayrollAreaInformationComponent', () => {
  let component: PayrollAreaInformationComponent;
  let fixture: ComponentFixture<PayrollAreaInformationComponent>;

  beforeEach(async(() => {
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
