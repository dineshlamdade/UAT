<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

import { TreatmentOfSpecifiedDeclarationComponent } from './treatment-of-specified-declaration.component';

describe('TreatmentOfSpecifiedDeclarationComponent', () => {
  let component: TreatmentOfSpecifiedDeclarationComponent;
  let fixture: ComponentFixture<TreatmentOfSpecifiedDeclarationComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
=======
  beforeEach(waitForAsync(() => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
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
