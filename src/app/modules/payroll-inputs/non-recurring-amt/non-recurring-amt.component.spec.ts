import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRecurringAmtComponent } from './non-recurring-amt.component';

describe('NonRecurringAmtComponent', () => {
  let component: NonRecurringAmtComponent;
  let fixture: ComponentFixture<NonRecurringAmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonRecurringAmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRecurringAmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
