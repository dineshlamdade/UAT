import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMasterLandingPageComponent } from './emp-master-landing-page.component';

describe('EmpMasterLandingPageComponent', () => {
  let component: EmpMasterLandingPageComponent;
  let fixture: ComponentFixture<EmpMasterLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpMasterLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpMasterLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
