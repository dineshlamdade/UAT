import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeCreationComponent } from './attribute-creation.component';

describe('AttributeCreationComponent', () => {
  let component: AttributeCreationComponent;
  let fixture: ComponentFixture<AttributeCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
