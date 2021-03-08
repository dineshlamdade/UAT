import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NationalSevingCertificateSummaryComponent } from './national-seving-certificate-summary.component';

describe('NationalSevingCertificateSummaryComponent', () => {
  let component: NationalSevingCertificateSummaryComponent;
  let fixture: ComponentFixture<NationalSevingCertificateSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalSevingCertificateSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalSevingCertificateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
