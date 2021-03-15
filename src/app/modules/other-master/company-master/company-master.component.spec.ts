import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompanyMasterComponent } from './company-master.component';

describe('CompanyMasterComponent', () => {
  let component: CompanyMasterComponent;
  let fixture: ComponentFixture<CompanyMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
