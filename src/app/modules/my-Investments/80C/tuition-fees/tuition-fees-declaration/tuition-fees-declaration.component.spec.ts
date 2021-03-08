import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TuitionFeesDeclarationComponent } from './tuition-fees-declaration.component';

describe('TuitionFeesDeclarationComponent', () => {
  let component: TuitionFeesDeclarationComponent;
  let fixture: ComponentFixture<TuitionFeesDeclarationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TuitionFeesDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuitionFeesDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
