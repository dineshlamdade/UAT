import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicallyHandicappedComponent } from './physically-handicapped.component';

describe('PhysicallyHandicappedComponent', () => {
  let component: PhysicallyHandicappedComponent;
  let fixture: ComponentFixture<PhysicallyHandicappedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicallyHandicappedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicallyHandicappedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
