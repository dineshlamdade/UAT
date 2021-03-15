import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumWagesDetailComponent } from './minimum-wages-detail.component';

describe('MinimumWagesDetailComponent', () => {
  let component: MinimumWagesDetailComponent;
  let fixture: ComponentFixture<MinimumWagesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimumWagesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimumWagesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
