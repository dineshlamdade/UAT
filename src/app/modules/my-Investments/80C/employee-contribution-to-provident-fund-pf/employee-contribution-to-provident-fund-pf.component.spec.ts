import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContributionToProvidentFundPFComponent } from './employee-contribution-to-provident-fund-pf.component';

describe('EmployeeContributionToProvidentFundPFComponent', () => {
  let component: EmployeeContributionToProvidentFundPFComponent;
  let fixture: ComponentFixture<EmployeeContributionToProvidentFundPFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeContributionToProvidentFundPFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeContributionToProvidentFundPFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
