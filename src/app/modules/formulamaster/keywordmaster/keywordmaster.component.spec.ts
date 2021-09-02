import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordmasterComponent } from './keywordmaster.component';

describe('KeywordmasterComponent', () => {
  let component: KeywordmasterComponent;
  let fixture: ComponentFixture<KeywordmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
