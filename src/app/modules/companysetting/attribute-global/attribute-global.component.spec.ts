import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeGlobalComponent } from './attribute-global.component';

describe('AttributeGlobalComponent', () => {
  let component: AttributeGlobalComponent;
  let fixture: ComponentFixture<AttributeGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
