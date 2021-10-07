import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentMediclaim80DMasterApprovalComponent } from './investment-mediclaim80-dmaster-approval.component';

describe('InvestmentMediclaim80DMasterApprovalComponent', () => {
  let component: InvestmentMediclaim80DMasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentMediclaim80DMasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentMediclaim80DMasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentMediclaim80DMasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
