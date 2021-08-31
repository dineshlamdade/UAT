import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulacreationComponent } from './formulacreation.component';

describe('FormulacreationComponent', () => {
  let component: FormulacreationComponent;
  let fixture: ComponentFixture<FormulacreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulacreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulacreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
