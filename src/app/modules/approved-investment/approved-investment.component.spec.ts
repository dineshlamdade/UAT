import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedInvestmentComponent } from './approved-investment.component';

describe('ApprovedInvestmentComponent', () => {
  let component: ApprovedInvestmentComponent;
  let fixture: ComponentFixture<ApprovedInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedInvestmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
