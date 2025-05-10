import { TestBed } from '@angular/core/testing';

import { AnimationInitializerService } from './animation-initializer.service';

describe('AnimationInitializerService', () => {
  let service: AnimationInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
