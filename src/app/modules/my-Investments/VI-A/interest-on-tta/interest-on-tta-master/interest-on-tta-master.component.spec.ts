import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestOnTtaMasterComponent } from './interest-on-tta-master.component';

describe('InterestOnTtaMasterComponent', () => {
  let component: InterestOnTtaMasterComponent;
  let fixture: ComponentFixture<InterestOnTtaMasterComponent>;

  beforeEach(async(() => {
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
