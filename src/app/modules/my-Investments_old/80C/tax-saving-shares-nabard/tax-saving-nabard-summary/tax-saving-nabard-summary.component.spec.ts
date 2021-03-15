import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaxSavingNabardSummaryComponent } from './tax-saving-nabard-summary.component';

describe('TaxSavingNabardSummaryComponent', () => {
  let component: TaxSavingNabardSummaryComponent;
  let fixture: ComponentFixture<TaxSavingNabardSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxSavingNabardSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSavingNabardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
