import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxsavingMfSummaryComponent } from './taxsaving-mf-summary.component';

describe('TaxsavingMfSummaryComponent', () => {
  let component: TaxsavingMfSummaryComponent;
  let fixture: ComponentFixture<TaxsavingMfSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxsavingMfSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxsavingMfSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
