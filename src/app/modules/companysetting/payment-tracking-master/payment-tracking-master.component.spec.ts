import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTrackingMasterComponent } from './payment-tracking-master.component';

describe('PaymentTrackingMasterComponent', () => {
  let component: PaymentTrackingMasterComponent;
  let fixture: ComponentFixture<PaymentTrackingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTrackingMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTrackingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
