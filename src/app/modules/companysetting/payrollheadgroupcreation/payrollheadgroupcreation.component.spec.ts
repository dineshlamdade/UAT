import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PayrollheadgroupcreationComponent } from './payrollheadgroupcreation.component';

describe('PayrollheadgroupcreationComponent', () => {
  let component: PayrollheadgroupcreationComponent;
  let fixture: ComponentFixture<PayrollheadgroupcreationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollheadgroupcreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollheadgroupcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
