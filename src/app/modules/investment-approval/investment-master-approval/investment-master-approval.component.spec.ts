import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentMasterApprovalComponent } from './investment-master-approval.component';

describe('InvestmentMasterApprovalComponent', () => {
  let component: InvestmentMasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentMasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentMasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentMasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
