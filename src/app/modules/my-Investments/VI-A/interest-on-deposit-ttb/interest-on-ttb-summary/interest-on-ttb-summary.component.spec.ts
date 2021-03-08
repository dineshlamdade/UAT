import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestOnTtbSummaryComponent } from './interest-on-ttb-summary.component';

describe('InterestOnTtbSummaryComponent', () => {
  let component: InterestOnTtbSummaryComponent;
  let fixture: ComponentFixture<InterestOnTtbSummaryComponent>;

  beforeEach(async(() => {
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
