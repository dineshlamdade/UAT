import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GgcDeclarationActualComponent } from './ggc-declaration-actual.component';

describe('GgcDeclarationActualComponent', () => {
  let component: GgcDeclarationActualComponent;
  let fixture: ComponentFixture<GgcDeclarationActualComponent>;

  beforeEach(waitForAsync(() => {
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
