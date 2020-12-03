import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedDepositsSummaryComponent } from './fixed-deposits-summary.component';

describe('FixedDepositsSummaryComponent', () => {
  let component: FixedDepositsSummaryComponent;
  let fixture: ComponentFixture<FixedDepositsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDepositsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDepositsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
