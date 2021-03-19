import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildhostelallowanceComponent } from './childhostelallowance.component';

describe('ChildhostelallowanceComponent', () => {
  let component: ChildhostelallowanceComponent;
  let fixture: ComponentFixture<ChildhostelallowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildhostelallowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildhostelallowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
