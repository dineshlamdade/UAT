import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAttributeGroupComponent } from './leave-attribute-group.component';

describe('LeaveAttributeGroupComponent', () => {
  let component: LeaveAttributeGroupComponent;
  let fixture: ComponentFixture<LeaveAttributeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveAttributeGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAttributeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
