import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebSocketsGateway {
  @WebSocketServer()
  server: Server;

  hosts: Array<{ roomId: string; clientId: string }> = [];

  @SubscribeMessage('room')
  handleRoomMessage(@MessageBody() roomId: string, @ConnectedSocket() client: Socket): any {
    this.server.in(client.id).socketsJoin(roomId);

    if (!this.hosts.find((host) => host.roomId === roomId)) {
      console.log('hi')
      this.hosts.push({ roomId, clientId: client.id });
      this.server.in(roomId).emit('hostMember');
    }
  }

  @SubscribeMessage('pause')
  handlePauseMessage(@MessageBody() roomId: string): any {
    this.server.in(roomId).emit('paused');
  }

  @SubscribeMessage('play')
  handleSeekedMessage(@MessageBody() data: { roomId: string; time: number }): any {
    this.server.in(data.roomId).emit('played', data.time);
  }

  @SubscribeMessage('chat')
  handleChatMessage(@MessageBody() data: { roomId: string; message: string }): any {
    this.server.in(data.roomId).emit('chating', data.message);
  }
}
