import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastentryGarnishmentComponent } from './fastentry-garnishment.component';

describe('FastentryGarnishmentComponent', () => {
  let component: FastentryGarnishmentComponent;
  let fixture: ComponentFixture<FastentryGarnishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastentryGarnishmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastentryGarnishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
