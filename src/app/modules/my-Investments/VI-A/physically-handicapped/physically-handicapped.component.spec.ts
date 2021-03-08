import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhysicallyHandicappedComponent } from './physically-handicapped.component';

describe('PhysicallyHandicappedComponent', () => {
  let component: PhysicallyHandicappedComponent;
  let fixture: ComponentFixture<PhysicallyHandicappedComponent>;

  beforeEach(waitForAsync(() => {
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
