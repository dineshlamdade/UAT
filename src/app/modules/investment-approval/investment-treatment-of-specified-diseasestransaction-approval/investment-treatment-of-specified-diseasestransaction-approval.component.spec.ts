import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalComponent } from './investment-treatment-of-specified-diseasestransaction-approval.component';

describe('InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalComponent', () => {
  let component: InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
