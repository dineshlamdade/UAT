import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulamasterComponent } from './formulamaster.component';

describe('FormulamasterComponent', () => {
  let component: FormulamasterComponent;
  let fixture: ComponentFixture<FormulamasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulamasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulamasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
