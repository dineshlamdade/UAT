import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfficeTermDepositDeclarationComponent } from './post-office-term-deposit-declaration.component';

describe('PostOfficeTermDepositDeclarationComponent', () => {
  let component: PostOfficeTermDepositDeclarationComponent;
  let fixture: ComponentFixture<PostOfficeTermDepositDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOfficeTermDepositDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOfficeTermDepositDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
