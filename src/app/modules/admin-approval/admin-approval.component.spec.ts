import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminApprovalComponent } from './admin-approval.component';

describe('AdminApprovalComponent', () => {
  let component: AdminApprovalComponent;
  let fixture: ComponentFixture<AdminApprovalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
