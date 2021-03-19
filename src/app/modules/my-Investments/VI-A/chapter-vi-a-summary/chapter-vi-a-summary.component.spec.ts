import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterVIASummaryComponent } from './chapter-vi-a-summary.component';

describe('ChapterVIASummaryComponent', () => {
  let component: ChapterVIASummaryComponent;
  let fixture: ComponentFixture<ChapterVIASummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterVIASummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterVIASummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
