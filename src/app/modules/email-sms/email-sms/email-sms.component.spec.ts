import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSmsComponent } from './email-sms.component';

describe('EmailSmsComponent', () => {
  let component: EmailSmsComponent;
  let fixture: ComponentFixture<EmailSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
