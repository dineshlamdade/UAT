import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GgcDeclarationActualComponent } from './ggc-declaration-actual.component';

describe('GgcDeclarationActualComponent', () => {
  let component: GgcDeclarationActualComponent;
  let fixture: ComponentFixture<GgcDeclarationActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GgcDeclarationActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GgcDeclarationActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
