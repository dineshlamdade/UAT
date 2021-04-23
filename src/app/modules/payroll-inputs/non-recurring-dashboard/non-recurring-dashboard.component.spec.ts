import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRecurringDashboardComponent } from './non-recurring-dashboard.component';

describe('NonRecurringDashboardComponent', () => {
  let component: NonRecurringDashboardComponent;
  let fixture: ComponentFixture<NonRecurringDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonRecurringDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRecurringDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
