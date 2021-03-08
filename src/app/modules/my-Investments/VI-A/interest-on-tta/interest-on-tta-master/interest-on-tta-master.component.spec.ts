import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InterestOnTtaMasterComponent } from './interest-on-tta-master.component';

describe('InterestOnTtaMasterComponent', () => {
  let component: InterestOnTtaMasterComponent;
  let fixture: ComponentFixture<InterestOnTtaMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestOnTtaMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestOnTtaMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
