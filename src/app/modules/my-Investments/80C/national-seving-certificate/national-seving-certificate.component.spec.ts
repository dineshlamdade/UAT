import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalSevingCertificateComponent } from './national-seving-certificate.component';

describe('NationalSevingCertificateComponent', () => {
  let component: NationalSevingCertificateComponent;
  let fixture: ComponentFixture<NationalSevingCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalSevingCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalSevingCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
