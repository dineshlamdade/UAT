import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningInformationComponent } from './joining-information.component';

describe('JoiningInformationComponent', () => {
  let component: JoiningInformationComponent;
  let fixture: ComponentFixture<JoiningInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoiningInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoiningInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
