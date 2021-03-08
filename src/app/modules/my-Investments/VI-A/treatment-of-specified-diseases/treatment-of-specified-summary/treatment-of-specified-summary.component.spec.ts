import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TreatmentOfSpecifiedSummaryComponent } from './treatment-of-specified-summary.component';

describe('TreatmentOfSpecifiedSummaryComponent', () => {
  let component: TreatmentOfSpecifiedSummaryComponent;
  let fixture: ComponentFixture<TreatmentOfSpecifiedSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentOfSpecifiedSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentOfSpecifiedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
