import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HandicappedDependentComponent } from './handicapped-dependent.component';

describe('HandicappedDependentComponent', () => {
  let component: HandicappedDependentComponent;
  let fixture: ComponentFixture<HandicappedDependentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HandicappedDependentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandicappedDependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
