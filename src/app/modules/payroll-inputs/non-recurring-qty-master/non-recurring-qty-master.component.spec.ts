import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRecurringQtyMasterComponent } from './non-recurring-qty-master.component';

describe('NonRecurringQtyMasterComponent', () => {
  let component: NonRecurringQtyMasterComponent;
  let fixture: ComponentFixture<NonRecurringQtyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonRecurringQtyMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRecurringQtyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
