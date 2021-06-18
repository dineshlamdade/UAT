import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRollStructureComponent } from './pay-roll-structure.component';

describe('PayRollStructureComponent', () => {
  let component: PayRollStructureComponent;
  let fixture: ComponentFixture<PayRollStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRollStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayRollStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
