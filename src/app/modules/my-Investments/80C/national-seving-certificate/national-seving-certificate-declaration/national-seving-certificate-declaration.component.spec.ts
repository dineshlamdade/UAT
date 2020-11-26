import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalSevingCertificateDeclarationComponent } from './national-seving-certificate-declaration.component';

describe('NationalSevingCertificateDeclarationComponent', () => {
  let component: NationalSevingCertificateDeclarationComponent;
  let fixture: ComponentFixture<NationalSevingCertificateDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalSevingCertificateDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalSevingCertificateDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
