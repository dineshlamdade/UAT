import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherincomeComponent } from './otherincome.component';

describe('OtherincomeComponent', () => {
  let component: OtherincomeComponent;
  let fixture: ComponentFixture<OtherincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherincomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
