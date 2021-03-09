import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestOnDepositTtbComponent } from './interest-on-deposit-ttb.component';

describe('InterestOnDepositTtbComponent', () => {
  let component: InterestOnDepositTtbComponent;
  let fixture: ComponentFixture<InterestOnDepositTtbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestOnDepositTtbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestOnDepositTtbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
