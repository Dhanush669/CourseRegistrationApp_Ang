import { TestBed } from '@angular/core/testing';

import { TostNotificationService } from './tost-notification.service';

describe('TostNotificationService', () => {
  let service: TostNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TostNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
