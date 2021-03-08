import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicdeclarationComponent } from './licdeclaration.component';

describe('LicdeclarationComponent', () => {
  let component: LicdeclarationComponent;
  let fixture: ComponentFixture<LicdeclarationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LicdeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicdeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
