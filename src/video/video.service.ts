import { BadRequestException, Injectable } from '@nestjs/common';
import { VideoUploadDto } from './dto/video.upload';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private videoRepository: Repository<Video>) {}

  async uploadVideo(videoFile: Express.Multer.File, videoUploadDto: VideoUploadDto) {
    const { title, description } = videoUploadDto;
    const { filename, path, size } = videoFile;

    try {
      const video = this.videoRepository.create({
        title,
        description,
        filename,
        path,
        size,
      });

      await this.videoRepository.save(video);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new BadRequestException('video with that name already exists');
      } else {
        throw new BadRequestException('video upload failed. Please try again or text support team');
      }
    }

    return 'video uploaded seccessfully';
  }

  async getVideo(id: string, req: Request) {
    const range = req.headers.get('ranger');
    if (!range) {
      throw new Error('Require range header');
    }

    const video = await this.videoRepository.findOneBy({ id: id });
    const { path, size } = video;
    
 
  }
}
