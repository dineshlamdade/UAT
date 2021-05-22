import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeDependencyComponent } from './attribute-dependency.component';

describe('AttributeDependencyComponent', () => {
  let component: AttributeDependencyComponent;
  let fixture: ComponentFixture<AttributeDependencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeDependencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
