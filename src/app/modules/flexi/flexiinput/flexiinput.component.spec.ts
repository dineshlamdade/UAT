import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexiinputComponent } from './flexiinput.component';

describe('FlexiinputComponent', () => {
  let component: FlexiinputComponent;
  let fixture: ComponentFixture<FlexiinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexiinputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexiinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
