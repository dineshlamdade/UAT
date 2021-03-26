import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePrivilegeComponent } from './role-privilege.component';

describe('RolePrivilegeComponent', () => {
  let component: RolePrivilegeComponent;
  let fixture: ComponentFixture<RolePrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolePrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});