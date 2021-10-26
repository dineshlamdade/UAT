import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentChildHostelAllowanceMasterApprovalComponent } from './investment-child-hostel-allowance-master-approval.component';

describe('InvestmentChildHostelAllowanceMasterApprovalComponent', () => {
  let component: InvestmentChildHostelAllowanceMasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentChildHostelAllowanceMasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentChildHostelAllowanceMasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentChildHostelAllowanceMasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
