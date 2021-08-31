import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryDashboardComponent } from './query-dashboard.component';

describe('QueryDashboardComponent', () => {
  let component: QueryDashboardComponent;
  let fixture: ComponentFixture<QueryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
