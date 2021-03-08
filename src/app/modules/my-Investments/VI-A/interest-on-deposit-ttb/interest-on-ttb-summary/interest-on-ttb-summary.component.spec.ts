import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InterestOnTtbSummaryComponent } from './interest-on-ttb-summary.component';

describe('InterestOnTtbSummaryComponent', () => {
  let component: InterestOnTtbSummaryComponent;
  let fixture: ComponentFixture<InterestOnTtbSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestOnTtbSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestOnTtbSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
