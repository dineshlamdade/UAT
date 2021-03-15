import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NpsDeclarationComponent } from './nps-declaration.component';

describe('NpsDeclarationComponent', () => {
  let component: NpsDeclarationComponent;
  let fixture: ComponentFixture<NpsDeclarationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NpsDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
