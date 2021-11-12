import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexiBasketAllocationComponent } from './flexi-basket-allocation.component';

describe('FlexiBasketAllocationComponent', () => {
  let component: FlexiBasketAllocationComponent;
  let fixture: ComponentFixture<FlexiBasketAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexiBasketAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexiBasketAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
