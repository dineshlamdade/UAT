import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContributionToVPFComponent } from './employee-contribution-to-vpf.component';

describe('EmployeeContributionToVPFComponent', () => {
  let component: EmployeeContributionToVPFComponent;
  let fixture: ComponentFixture<EmployeeContributionToVPFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeContributionToVPFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeContributionToVPFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
