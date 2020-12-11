import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandicappedDependentComponent } from './handicapped-dependent.component';

describe('HandicappedDependentComponent', () => {
  let component: HandicappedDependentComponent;
  let fixture: ComponentFixture<HandicappedDependentComponent>;

  beforeEach(async(() => {
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
