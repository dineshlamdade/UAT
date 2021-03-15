import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostOfficeDeclarationComponent } from './post-office-declaration.component';

describe('PostOfficeDeclarationComponent', () => {
  let component: PostOfficeDeclarationComponent;
  let fixture: ComponentFixture<PostOfficeDeclarationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOfficeDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOfficeDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
