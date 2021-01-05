/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuListsService } from './menuLists.service';

describe('Service: MenuLists', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuListsService]
    });
  });

  it('should ...', inject([MenuListsService], (service: MenuListsService) => {
    expect(service).toBeTruthy();
  }));
});
