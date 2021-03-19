import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAdjustmentsSummaryComponent } from './tax-adjustments-summary.component';

describe('TaxAdjustmentsSummaryComponent', () => {
  let component: TaxAdjustmentsSummaryComponent;
  let fixture: ComponentFixture<TaxAdjustmentsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxAdjustmentsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxAdjustmentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
