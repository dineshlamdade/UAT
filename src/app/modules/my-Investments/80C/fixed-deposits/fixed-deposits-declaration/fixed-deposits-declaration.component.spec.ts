import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedDepositsDeclarationComponent } from './fixed-deposits-declaration.component';

describe('FixedDepositsDeclarationComponent', () => {
  let component: FixedDepositsDeclarationComponent;
  let fixture: ComponentFixture<FixedDepositsDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDepositsDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDepositsDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
