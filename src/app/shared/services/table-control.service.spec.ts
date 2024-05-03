import { TestBed } from '@angular/core/testing';

import { TableControlService } from './table-control.service';

describe('TableControlService', () => {
  let service: TableControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
