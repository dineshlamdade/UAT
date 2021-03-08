import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SukanyaSamriddhiComponent } from './sukanya-samriddhi.component';

describe('SukanyaSamriddhiComponent', () => {
  let component: SukanyaSamriddhiComponent;
  let fixture: ComponentFixture<SukanyaSamriddhiComponent>;

  beforeEach(waitForAsync(() => {
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
