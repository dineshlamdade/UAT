import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RembRegistrationComponent } from './remb-registration.component';

describe('RembRegistrationComponent', () => {
  let component: RembRegistrationComponent;
  let fixture: ComponentFixture<RembRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RembRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RembRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
