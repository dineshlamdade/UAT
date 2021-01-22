import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorCitizenSummaryComponent } from './senior-citizen-summary.component';

describe('SeniorCitizenSummaryComponent', () => {
  let component: SeniorCitizenSummaryComponent;
  let fixture: ComponentFixture<SeniorCitizenSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorCitizenSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorCitizenSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
