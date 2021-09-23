import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentIntereston80TTATTBMasterApprovalComponent } from './investment-intereston80-tta-ttb-master-approval.component';

describe('InvestmentIntereston80TTATTBMasterApprovalComponent', () => {
  let component: InvestmentIntereston80TTATTBMasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentIntereston80TTATTBMasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentIntereston80TTATTBMasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentIntereston80TTATTBMasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
