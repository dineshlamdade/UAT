import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestOnTtaComponent } from './interest-on-tta.component';

describe('InterestOnTtaComponent', () => {
  let component: InterestOnTtaComponent;
  let fixture: ComponentFixture<InterestOnTtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestOnTtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestOnTtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
