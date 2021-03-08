import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LanguageDetailComponent } from './language-detail.component';

describe('LanguageCertificationDetailComponent', () => {
  let component: LanguageDetailComponent;
  let fixture: ComponentFixture<LanguageDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
