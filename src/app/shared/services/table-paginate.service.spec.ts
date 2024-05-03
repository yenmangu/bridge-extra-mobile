import { TestBed } from '@angular/core/testing';

import { TablePaginateService } from './table-paginate.service';

describe('TablePaginateService', () => {
  let service: TablePaginateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablePaginateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
