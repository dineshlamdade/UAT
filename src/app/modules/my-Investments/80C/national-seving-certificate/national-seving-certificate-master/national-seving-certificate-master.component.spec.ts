import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalSevingCertificateMasterComponent } from './national-seving-certificate-master.component';

describe('NationalSevingCertificateMasterComponent', () => {
  let component: NationalSevingCertificateMasterComponent;
  let fixture: ComponentFixture<NationalSevingCertificateMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalSevingCertificateMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalSevingCertificateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
