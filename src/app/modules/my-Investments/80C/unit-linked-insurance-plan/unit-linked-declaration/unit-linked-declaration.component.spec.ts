import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitLinkedDeclarationComponent } from './unit-linked-declaration.component';

describe('UnitLinkedDeclarationComponent', () => {
  let component: UnitLinkedDeclarationComponent;
  let fixture: ComponentFixture<UnitLinkedDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitLinkedDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitLinkedDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
