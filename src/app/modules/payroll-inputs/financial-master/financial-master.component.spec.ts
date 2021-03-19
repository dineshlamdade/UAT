import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialMasterComponent } from './financial-master.component';

describe('FinancialMasterComponent', () => {
  let component: FinancialMasterComponent;
  let fixture: ComponentFixture<FinancialMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
