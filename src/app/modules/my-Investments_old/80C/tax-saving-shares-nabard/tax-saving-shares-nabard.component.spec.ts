import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaxSavingSharesNabardComponent } from './tax-saving-shares-nabard.component';

describe('TaxSavingSharesNabardComponent', () => {
  let component: TaxSavingSharesNabardComponent;
  let fixture: ComponentFixture<TaxSavingSharesNabardComponent>;

  beforeEach(waitForAsync(() => {
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
