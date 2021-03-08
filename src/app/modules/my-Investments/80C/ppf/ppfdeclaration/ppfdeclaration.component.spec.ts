import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PPFDeclarationComponent } from './ppfdeclaration.component';

describe('PPFDeclarationComponent', () => {
  let component: PPFDeclarationComponent;
  let fixture: ComponentFixture<PPFDeclarationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PPFDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPFDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
