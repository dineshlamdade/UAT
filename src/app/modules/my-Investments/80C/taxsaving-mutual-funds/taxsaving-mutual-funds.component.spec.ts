import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxsavingMutualFundsComponent } from './taxsaving-mutual-funds.component';

describe('TaxsavingMutualFundsComponent', () => {
  let component: TaxsavingMutualFundsComponent;
  let fixture: ComponentFixture<TaxsavingMutualFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxsavingMutualFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxsavingMutualFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
