import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';

import { Reply } from '../interfaces/reply';
import { ChatClientService } from '../core/chat-client.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('content') private content: any;

  public currentMessage = "";
  
  public replies: Reply[] = [];

  constructor(private chat: ChatClientService) {}

  ngOnInit() {
    this.chat.connect();
    this.chat.username = environment.chatUsername;

    this.chat.setReceivingCallback(reply => {
      this.receive(reply);
    });
  }

  public scrollToBottom(): void {
    this.content.scrollToBottom(300);
  }

  public send(): void {
    this.sendMessage(this.currentMessage);
    this.currentMessage = "";
  }

  public sendMessage(message: string): void {
    this.chat.sendMessage(message);
    this.scrollToBottom();
  }

  public receive(reply: Reply): void {
    this.replies.push(reply);
    this.scrollToBottom();
  }
}
