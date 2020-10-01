import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';

import { Reply } from '../interfaces/reply';

@Injectable({
  providedIn: 'root'
})
export class ChatClientService {
  
  private socketClient: SocketIOClient.Socket;

  public username: string = "";

  constructor() { 
  }

  public connect(): void {
    this.socketClient = io.connect(`${environment.backendHost}:${environment.backendPort}`);
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    const reply: Reply = {
      nickname: this.username,
      message
    };
    this.socketClient.emit('messageToServer', reply);
  
  }

  public setReceivingCallback(callback: Function) {
    this.socketClient.on('messageToClient', callback);
  }
}
