import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeamasterComponent } from './ceamaster.component';

describe('CeamasterComponent', () => {
  let component: CeamasterComponent;
  let fixture: ComponentFixture<CeamasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeamasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeamasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
