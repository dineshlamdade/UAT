import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentviewerComponent } from './documentviewer.component';

describe('DocumentviewerComponent', () => {
  let component: DocumentviewerComponent;
  let fixture: ComponentFixture<DocumentviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
