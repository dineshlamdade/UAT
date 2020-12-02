import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxsavingMfMasterComponent } from './taxsaving-mf-master.component';

describe('TaxsavingMfMasterComponent', () => {
  let component: TaxsavingMfMasterComponent;
  let fixture: ComponentFixture<TaxsavingMfMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxsavingMfMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxsavingMfMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
