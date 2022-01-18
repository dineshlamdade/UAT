import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentLandingPageComponent } from './investment-landing-page.component';

describe('InvestmentLandingPageComponent', () => {
  let component: InvestmentLandingPageComponent;
  let fixture: ComponentFixture<InvestmentLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
