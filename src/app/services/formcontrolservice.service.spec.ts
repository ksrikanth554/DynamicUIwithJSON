import { TestBed } from '@angular/core/testing';

import { FormcontrolserviceService } from './formcontrolservice.service';

describe('FormcontrolserviceService', () => {
  let service: FormcontrolserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormcontrolserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
