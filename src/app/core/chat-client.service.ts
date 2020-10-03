import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Socket } from 'ngx-socket-io'

import { Reply } from '../interfaces/reply';

@Injectable({
  providedIn: 'root'
})
export class ChatClientService {
  
  public username: string = "";

  constructor(private socketClient: Socket) { 
  }

  public connect(): void {
    this.socketClient.connect();
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
