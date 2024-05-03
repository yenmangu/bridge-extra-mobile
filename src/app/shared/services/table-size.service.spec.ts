import { TestBed } from '@angular/core/testing';

import { TableSizeService } from './table-size.service';

describe('TableSizeService', () => {
  let service: TableSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
