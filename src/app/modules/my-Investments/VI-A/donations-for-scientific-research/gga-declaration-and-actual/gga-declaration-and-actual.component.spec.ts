import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GgaDeclarationAndActualComponent } from './gga-declaration-and-actual.component';

describe('GgaDeclarationAndActualComponent', () => {
  let component: GgaDeclarationAndActualComponent;
  let fixture: ComponentFixture<GgaDeclarationAndActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GgaDeclarationAndActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GgaDeclarationAndActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
