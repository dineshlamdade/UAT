import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeaComponent } from './cea.component';

describe('CeaComponent', () => {
  let component: CeaComponent;
  let fixture: ComponentFixture<CeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
