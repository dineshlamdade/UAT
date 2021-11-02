import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentChildEducationAllowanceMasterApprovalComponent } from './investment-child-education-allowance-master-approval.component';

describe('InvestmentChildEducationAllowanceMasterApprovalComponent', () => {
  let component: InvestmentChildEducationAllowanceMasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentChildEducationAllowanceMasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentChildEducationAllowanceMasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentChildEducationAllowanceMasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
