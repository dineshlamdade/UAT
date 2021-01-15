import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicallyHandicappedDeclarationAndActualComponent } from './physically-handicapped-declaration-and-actual.component';

describe('PhysicallyHandicappedDeclarationAndActualComponent', () => {
  let component: PhysicallyHandicappedDeclarationAndActualComponent;
  let fixture: ComponentFixture<PhysicallyHandicappedDeclarationAndActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicallyHandicappedDeclarationAndActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicallyHandicappedDeclarationAndActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
