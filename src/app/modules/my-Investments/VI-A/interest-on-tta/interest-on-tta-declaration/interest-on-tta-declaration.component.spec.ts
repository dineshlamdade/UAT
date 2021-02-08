import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestOnTtaDeclarationComponent } from './interest-on-tta-declaration.component';

describe('InterestOnTtaDeclarationComponent', () => {
  let component: InterestOnTtaDeclarationComponent;
  let fixture: ComponentFixture<InterestOnTtaDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestOnTtaDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestOnTtaDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
