import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaxSavingNabardActualComponent } from './tax-saving-nabard-actual.component';

describe('TaxSavingNabardActualComponent', () => {
  let component: TaxSavingNabardActualComponent;
  let fixture: ComponentFixture<TaxSavingNabardActualComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxSavingNabardActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSavingNabardActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
