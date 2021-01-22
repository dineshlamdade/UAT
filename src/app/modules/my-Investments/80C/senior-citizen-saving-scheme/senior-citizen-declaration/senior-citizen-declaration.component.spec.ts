import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorCitizenDeclarationComponent } from './senior-citizen-declaration.component';

describe('SeniorCitizenDeclarationComponent', () => {
  let component: SeniorCitizenDeclarationComponent;
  let fixture: ComponentFixture<SeniorCitizenDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorCitizenDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorCitizenDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
