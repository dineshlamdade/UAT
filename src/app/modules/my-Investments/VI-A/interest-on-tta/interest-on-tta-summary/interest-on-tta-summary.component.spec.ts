import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestOnTtaSummaryComponent } from './interest-on-tta-summary.component';

describe('InterestOnTtaSummaryComponent', () => {
  let component: InterestOnTtaSummaryComponent;
  let fixture: ComponentFixture<InterestOnTtaSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestOnTtaSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestOnTtaSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
