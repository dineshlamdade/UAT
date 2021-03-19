import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildeducationallowanceComponent } from './childeducationallowance.component';

describe('ChildeducationallowanceComponent', () => {
  let component: ChildeducationallowanceComponent;
  let fixture: ComponentFixture<ChildeducationallowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildeducationallowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildeducationallowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
