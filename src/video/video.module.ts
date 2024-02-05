import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../entity/video.entity';
import { Room } from 'src/entity/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, Room])],
  providers: [VideoService],
  controllers: [VideoController],
  exports: [VideoService],
})
export class VideoModule {}
