import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaxsavingMfDeclarationComponent } from './taxsaving-mf-declaration.component';

describe('TaxsavingMfDeclarationComponent', () => {
  let component: TaxsavingMfDeclarationComponent;
  let fixture: ComponentFixture<TaxsavingMfDeclarationComponent>;

  beforeEach(waitForAsync(() => {
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
