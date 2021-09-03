import { TestBed } from '@angular/core/testing';

import { FormulaServiceService } from './formula-service.service';

describe('FormulaServiceService', () => {
  let service: FormulaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
