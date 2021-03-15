import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComplianceSummaryComponent } from './compliance-summary.component';

describe('ComplianceSummaryComponent', () => {
  let component: ComplianceSummaryComponent;
  let fixture: ComponentFixture<ComplianceSummaryComponent>;

  beforeEach(waitForAsync(() => {
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
