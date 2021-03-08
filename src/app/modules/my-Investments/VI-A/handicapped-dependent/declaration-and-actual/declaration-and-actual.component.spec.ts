import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeclarationAndActualComponent } from './declaration-and-actual.component';

describe('DeclarationAndActualComponent', () => {
  let component: DeclarationAndActualComponent;
  let fixture: ComponentFixture<DeclarationAndActualComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationAndActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationAndActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
