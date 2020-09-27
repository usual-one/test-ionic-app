import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('content') private content: any;

  public userName: string;

  public currentMessage: string;
  
  public replies: object[];

  private socket: SocketIOClient.Socket;

  constructor() {
    this.userName = environment.chatUsername;
    this.currentMessage = "";
    this.replies = [];
    this.socket = io.connect(`${environment.backendHost}:${environment.backendPort}`);
  }

  ngOnInit() {
    this.socket.on('connect', () => {});

    this.socket.on('messageToClient', reply => {
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

  public sendMessage(_message: string): void {
    if (!_message) {
      return;
    }
    const reply = {
      nickname: this.userName,
      message: _message
    };
    this.socket.emit('messageToServer', reply);
    this.scrollToBottom();
  }

  public receive(reply): void {
    this.replies.push(reply);
    this.scrollToBottom();
  }
}
