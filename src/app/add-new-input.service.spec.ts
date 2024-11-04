import { TestBed } from '@angular/core/testing';

import { AddNewInputService } from './add-new-input.service';

describe('AddNewInputService', () => {
  let service: AddNewInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
