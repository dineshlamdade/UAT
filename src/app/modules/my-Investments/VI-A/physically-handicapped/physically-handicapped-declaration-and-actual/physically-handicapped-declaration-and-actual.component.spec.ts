import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhysicallyHandicappedDeclarationAndActualComponent } from './physically-handicapped-declaration-and-actual.component';

describe('PhysicallyHandicappedDeclarationAndActualComponent', () => {
  let component: PhysicallyHandicappedDeclarationAndActualComponent;
  let fixture: ComponentFixture<PhysicallyHandicappedDeclarationAndActualComponent>;

  beforeEach(waitForAsync(() => {
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
