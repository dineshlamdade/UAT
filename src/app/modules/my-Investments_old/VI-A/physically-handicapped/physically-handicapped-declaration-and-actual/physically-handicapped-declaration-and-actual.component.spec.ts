<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

import { PhysicallyHandicappedDeclarationAndActualComponent } from './physically-handicapped-declaration-and-actual.component';

describe('PhysicallyHandicappedDeclarationAndActualComponent', () => {
  let component: PhysicallyHandicappedDeclarationAndActualComponent;
  let fixture: ComponentFixture<PhysicallyHandicappedDeclarationAndActualComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
=======
  beforeEach(waitForAsync(() => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
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
