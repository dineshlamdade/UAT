import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleCreationComponent } from './cycle-creation.component';

describe('CycleCreationComponent', () => {
  let component: CycleCreationComponent;
  let fixture: ComponentFixture<CycleCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
