import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGroupMasterComponent } from './company-group-master.component';

describe('CompanyGroupMasterComponent', () => {
  let component: CompanyGroupMasterComponent;
  let fixture: ComponentFixture<CompanyGroupMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyGroupMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyGroupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
