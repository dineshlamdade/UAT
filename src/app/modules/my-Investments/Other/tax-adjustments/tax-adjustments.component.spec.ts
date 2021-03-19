import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAdjustmentsComponent } from './tax-adjustments.component';

describe('TaxAdjustmentsComponent', () => {
  let component: TaxAdjustmentsComponent;
  let fixture: ComponentFixture<TaxAdjustmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxAdjustmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
