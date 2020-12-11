import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SukanyaSamriddhiComponent } from './sukanya-samriddhi.component';

describe('SukanyaSamriddhiComponent', () => {
  let component: SukanyaSamriddhiComponent;
  let fixture: ComponentFixture<SukanyaSamriddhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SukanyaSamriddhiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SukanyaSamriddhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
