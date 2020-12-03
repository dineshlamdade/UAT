import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSavingSharesNabardComponent } from './tax-saving-shares-nabard.component';

describe('TaxSavingSharesNabardComponent', () => {
  let component: TaxSavingSharesNabardComponent;
  let fixture: ComponentFixture<TaxSavingSharesNabardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxSavingSharesNabardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSavingSharesNabardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
