import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentHandicappeddependentmasterApprovalComponent } from './investment-handicappeddependentmaster-approval.component';

describe('InvestmentHandicappeddependentmasterApprovalComponent', () => {
  let component: InvestmentHandicappeddependentmasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentHandicappeddependentmasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentHandicappeddependentmasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentHandicappeddependentmasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
