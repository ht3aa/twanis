import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class WebSocketsGateway {
  @WebSocketServer()
  server: Server;

  n: number = 0;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: any): any {
    this.n++;

    this.server.emit('message', this.n);
  }
}

