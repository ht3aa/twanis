import { Module } from '@nestjs/common';
import { WebSocketsGateway } from './web-sockets.gateway';
import { VideoService } from 'src/video/video.service';
import { Video } from 'src/entity/video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/entity/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, Room])],
  providers: [WebSocketsGateway, VideoService],
})
export class WebSocketsModule {}
