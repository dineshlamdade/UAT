import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesandPermissionComponent } from './user-rolesand-permission.component';

describe('UserRolesandPermissionComponent', () => {
  let component: UserRolesandPermissionComponent;
  let fixture: ComponentFixture<UserRolesandPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRolesandPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesandPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
