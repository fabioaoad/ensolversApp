import { TestBed } from '@angular/core/testing';

import { EnsolversService } from './ensolvers.service';

describe('EnsolversService', () => {
  let service: EnsolversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnsolversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
