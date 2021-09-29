import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexiInputComponent } from './flexi-input.component';

describe('FlexiInputComponent', () => {
  let component: FlexiInputComponent;
  let fixture: ComponentFixture<FlexiInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexiInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexiInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
