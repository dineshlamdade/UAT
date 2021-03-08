import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InterestOnTtbMasterComponent } from './interest-on-ttb-master.component';

describe('InterestOnTtbMasterComponent', () => {
  let component: InterestOnTtbMasterComponent;
  let fixture: ComponentFixture<InterestOnTtbMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestOnTtbMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestOnTtbMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
