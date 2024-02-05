import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { VideoService } from 'src/video/video.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebSocketsGateway {
  @WebSocketServer()
  server: Server;

  hosts: Array<{ roomId: string; clientId: string }> = [];

  constructor(private videoService: VideoService) {}

  @SubscribeMessage('room')
  async handleRoomMessage(
    @MessageBody() body: { roomId: string, username: string, roomPath: string, videoId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.in(client.id).socketsJoin(body.roomId);

    if (!this.hosts.find((host) => host.roomId === body.roomId)) {
      this.hosts.push({ roomId: body.roomId, clientId: client.id });

      console.log(body);
      await this.videoService.createRoom({
        videoId: body.videoId,
        roomPath: body.roomPath,
        hostName: body.username,
      })

      this.server.in(body.roomId).emit('hostMember');
    }
  }

  @SubscribeMessage('deleteRoom')
  async handleDeleteRoomMessage(
    @MessageBody() body: { roomPath: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomPath } = body;
    const host = this.hosts.find((host) => host.clientId === client.id);

    if (host) {
      await this.videoService.deleteRoom(roomPath);
      this.server.in(host.roomId).emit('deletedRoom', roomPath);
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
  handleChatMessage(
    @MessageBody() data: { roomId: string; message: string; username: string },
  ): any {
    this.server.in(data.roomId).emit('chating', { message: data.message, username: data.username });
  }
}
