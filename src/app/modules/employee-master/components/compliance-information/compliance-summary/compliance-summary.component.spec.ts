import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceSummaryComponent } from './compliance-summary.component';

describe('ComplianceSummaryComponent', () => {
  let component: ComplianceSummaryComponent;
  let fixture: ComponentFixture<ComplianceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
