import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRecurringQtyComponent } from './non-recurring-qty.component';

describe('NonRecurringQtyComponent', () => {
  let component: NonRecurringQtyComponent;
  let fixture: ComponentFixture<NonRecurringQtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonRecurringQtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRecurringQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
