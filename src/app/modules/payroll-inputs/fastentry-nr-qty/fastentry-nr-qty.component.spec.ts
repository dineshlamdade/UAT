import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastentryNrQtyComponent } from './fastentry-nr-qty.component';

describe('FastentryNrQtyComponent', () => {
  let component: FastentryNrQtyComponent;
  let fixture: ComponentFixture<FastentryNrQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastentryNrQtyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastentryNrQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
