import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeniorCitizenDeclarationComponent } from './senior-citizen-declaration.component';

describe('SeniorCitizenDeclarationComponent', () => {
  let component: SeniorCitizenDeclarationComponent;
  let fixture: ComponentFixture<SeniorCitizenDeclarationComponent>;

  beforeEach(waitForAsync(() => {
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
