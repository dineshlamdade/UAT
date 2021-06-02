import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalSavingCertificateNSCComponent } from './national-saving-certificate-nsc.component';

describe('NationalSavingCertificateNSCComponent', () => {
  let component: NationalSavingCertificateNSCComponent;
  let fixture: ComponentFixture<NationalSavingCertificateNSCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalSavingCertificateNSCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalSavingCertificateNSCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
