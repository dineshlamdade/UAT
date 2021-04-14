import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherincomedeclarationComponent } from './otherincomedeclaration.component';

describe('OtherincomedeclarationComponent', () => {
  let component: OtherincomedeclarationComponent;
  let fixture: ComponentFixture<OtherincomedeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherincomedeclarationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherincomedeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
