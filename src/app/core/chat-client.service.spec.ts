import { TestBed } from '@angular/core/testing';

import { ChatClientService } from './chat-client.service';

describe('ChatClientService', () => {
  let service: ChatClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
