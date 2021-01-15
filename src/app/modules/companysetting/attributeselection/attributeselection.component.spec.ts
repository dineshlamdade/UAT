import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeselectionComponent } from './attributeselection.component';

describe('AttributeselectionComponent', () => {
  let component: AttributeselectionComponent;
  let fixture: ComponentFixture<AttributeselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
