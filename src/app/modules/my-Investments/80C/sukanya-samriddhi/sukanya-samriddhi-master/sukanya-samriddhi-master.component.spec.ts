import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SukanyaSamriddhiMasterComponent } from './sukanya-samriddhi-master.component';

describe('SukanyaSamriddhiMasterComponent', () => {
  let component: SukanyaSamriddhiMasterComponent;
  let fixture: ComponentFixture<SukanyaSamriddhiMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SukanyaSamriddhiMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SukanyaSamriddhiMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
