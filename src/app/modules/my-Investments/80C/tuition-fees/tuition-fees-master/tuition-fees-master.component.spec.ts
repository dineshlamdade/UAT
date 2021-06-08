import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuitionFeesMasterComponent } from './tuition-fees-master.component';

describe('TuitionFeesMasterComponent', () => {
  let component: TuitionFeesMasterComponent;
  let fixture: ComponentFixture<TuitionFeesMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuitionFeesMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuitionFeesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
