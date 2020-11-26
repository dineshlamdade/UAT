import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxsavingMfDeclarationComponent } from './taxsaving-mf-declaration.component';

describe('TaxsavingMfDeclarationComponent', () => {
  let component: TaxsavingMfDeclarationComponent;
  let fixture: ComponentFixture<TaxsavingMfDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxsavingMfDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxsavingMfDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
