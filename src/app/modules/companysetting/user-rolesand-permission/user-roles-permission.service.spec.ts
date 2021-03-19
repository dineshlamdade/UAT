import { TestBed } from '@angular/core/testing';

import { UserRolesPermissionService } from './user-roles-permission.service';

describe('UserRolesPermissionService', () => {
  let service: UserRolesPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRolesPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
