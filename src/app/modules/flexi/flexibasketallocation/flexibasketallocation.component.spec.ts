import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexibasketallocationComponent } from './flexibasketallocation.component';

describe('FlexibasketallocationComponent', () => {
  let component: FlexibasketallocationComponent;
  let fixture: ComponentFixture<FlexibasketallocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexibasketallocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexibasketallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
