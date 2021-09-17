import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentApprovalComponent } from './investment-approval.component';

describe('InvestmentApprovalComponent', () => {
  let component: InvestmentApprovalComponent;
  let fixture: ComponentFixture<InvestmentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
