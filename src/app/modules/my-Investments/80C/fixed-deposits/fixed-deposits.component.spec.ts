import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixedDepositsComponent } from './fixed-deposits.component';

describe('FixedDepositsComponent', () => {
  let component: FixedDepositsComponent;
  let fixture: ComponentFixture<FixedDepositsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDepositsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
