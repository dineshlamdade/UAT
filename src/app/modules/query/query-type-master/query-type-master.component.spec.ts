import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryTypeMasterComponent } from './query-type-master.component';

describe('QueryTypeMasterComponent', () => {
  let component: QueryTypeMasterComponent;
  let fixture: ComponentFixture<QueryTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryTypeMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
