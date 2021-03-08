import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PpdeclarationComponent } from './ppdeclaration.component';

describe('PpdeclarationComponent', () => {
  let component: PpdeclarationComponent;
  let fixture: ComponentFixture<PpdeclarationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PpdeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpdeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
