import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentOfSpecifiedDeclarationComponent } from './treatment-of-specified-declaration.component';

describe('TreatmentOfSpecifiedDeclarationComponent', () => {
  let component: TreatmentOfSpecifiedDeclarationComponent;
  let fixture: ComponentFixture<TreatmentOfSpecifiedDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentOfSpecifiedDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentOfSpecifiedDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
