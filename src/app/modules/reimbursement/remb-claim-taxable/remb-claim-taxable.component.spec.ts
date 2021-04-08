import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RembClaimTaxableComponent } from './remb-claim-taxable.component';

describe('RembClaimTaxableComponent', () => {
  let component: RembClaimTaxableComponent;
  let fixture: ComponentFixture<RembClaimTaxableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RembClaimTaxableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RembClaimTaxableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
