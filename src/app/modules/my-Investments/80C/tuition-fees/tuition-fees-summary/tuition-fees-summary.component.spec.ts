import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuitionFeesSummaryComponent } from './tuition-fees-summary.component';

describe('TuitionFeesSummaryComponent', () => {
  let component: TuitionFeesSummaryComponent;
  let fixture: ComponentFixture<TuitionFeesSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuitionFeesSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuitionFeesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
