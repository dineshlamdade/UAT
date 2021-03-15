import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AttributecreationComponent } from './attributecreation.component';

describe('AttributecreationComponent', () => {
  let component: AttributecreationComponent;
  let fixture: ComponentFixture<AttributecreationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributecreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributecreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
