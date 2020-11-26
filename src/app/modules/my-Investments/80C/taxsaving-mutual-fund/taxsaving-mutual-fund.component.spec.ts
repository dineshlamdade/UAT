import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxsavingMutualFundComponent } from './taxsaving-mutual-fund.component';

describe('TaxsavingMutualFundComponent', () => {
  let component: TaxsavingMutualFundComponent;
  let fixture: ComponentFixture<TaxsavingMutualFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxsavingMutualFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxsavingMutualFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
