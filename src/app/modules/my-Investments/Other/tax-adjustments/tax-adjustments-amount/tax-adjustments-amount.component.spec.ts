import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAdjustmentsAmountComponent } from './tax-adjustments-amount.component';

describe('TaxAdjustmentsAmountComponent', () => {
  let component: TaxAdjustmentsAmountComponent;
  let fixture: ComponentFixture<TaxAdjustmentsAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxAdjustmentsAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxAdjustmentsAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
