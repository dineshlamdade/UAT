import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InterestOnTtbDeclarationComponent } from './interest-on-ttb-declaration.component';

describe('InterestOnTtbDeclarationComponent', () => {
  let component: InterestOnTtbDeclarationComponent;
  let fixture: ComponentFixture<InterestOnTtbDeclarationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestOnTtbDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestOnTtbDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
