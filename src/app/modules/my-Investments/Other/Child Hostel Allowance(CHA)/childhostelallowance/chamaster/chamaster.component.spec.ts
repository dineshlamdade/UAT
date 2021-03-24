import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamasterComponent } from './chamaster.component';

describe('ChamasterComponent', () => {
  let component: ChamasterComponent;
  let fixture: ComponentFixture<ChamasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
