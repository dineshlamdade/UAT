import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransferInformationComponent } from './transfer-information.component';

describe('TransferInformationComponent', () => {
  let component: TransferInformationComponent;
  let fixture: ComponentFixture<TransferInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
