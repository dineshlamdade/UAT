import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleDefinitionComponent } from './cycle-definition.component';

describe('CycleDefinitionComponent', () => {
  let component: CycleDefinitionComponent;
  let fixture: ComponentFixture<CycleDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
