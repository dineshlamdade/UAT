import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementMasterComponent } from './reimbursement-master.component';

describe('ReimbursementMasterComponent', () => {
  let component: ReimbursementMasterComponent;
  let fixture: ComponentFixture<ReimbursementMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
