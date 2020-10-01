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

  public userName: string = environment.chatUsername;

  public currentMessage = "";
  
  public replies: object[] = [];

  private socket: SocketIOClient.Socket;

  constructor() {}

  ngOnInit() {
    this.socket = io.connect(`${environment.backendHost}:${environment.backendPort}`);

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

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    const reply = {
      nickname: this.userName,
      message
    };
    this.socket.emit('messageToServer', reply);
    this.scrollToBottom();
  }

  public receive(reply): void {
    this.replies.push(reply);
    this.scrollToBottom();
  }
}
