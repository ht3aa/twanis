import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
