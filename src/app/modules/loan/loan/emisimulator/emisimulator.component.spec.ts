import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisimulatorComponent } from './emisimulator.component';

describe('EmisimulatorComponent', () => {
  let component: EmisimulatorComponent;
  let fixture: ComponentFixture<EmisimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmisimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmisimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
