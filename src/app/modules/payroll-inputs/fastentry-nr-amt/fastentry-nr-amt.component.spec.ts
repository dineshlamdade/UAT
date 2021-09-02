import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastentryNRAmtComponent } from './fastentry-nr-amt.component';

describe('FastentryNRAmtComponent', () => {
  let component: FastentryNRAmtComponent;
  let fixture: ComponentFixture<FastentryNRAmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastentryNRAmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastentryNRAmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
