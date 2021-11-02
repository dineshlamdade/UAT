import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalComponent } from './investment-treatment-of-specified-diseases-master-approval.component';

describe('InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalComponent', () => {
  let component: InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
