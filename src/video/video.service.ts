import { BadRequestException, Injectable, NotFoundException, Redirect } from '@nestjs/common';
import { VideoUploadDto } from './dto/video.upload';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../entity/video.entity';
import * as fs from 'fs';

interface headersWithRange extends Headers {
  range?: string;
}

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private videoRepository: Repository<Video>) {}

  async uploadVideo(
    videoFile: Express.Multer.File,
    thumbnailFile: Express.Multer.File,
    videoUploadDto: VideoUploadDto,
  ) {
    const { title, description } = videoUploadDto;

    try {
      const video = this.videoRepository.create({
        title,
        description,
        videoPath: videoFile.path,
        thumbnailPath: thumbnailFile.path,
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
    return
  }

  async streamVideo(id: string, req: Request) {
    const { range } = req.headers as headersWithRange;
    if (!range) {
      throw new BadRequestException('Require range header');
    }

    const video = await this.videoRepository.findOneBy({ id: id });

    if (!video) {
      throw new NotFoundException('video not found');
    }

    const { videoPath } = video;

    const size = fs.statSync('./' + videoPath).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, size - 1);

    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    const videoStream = fs.createReadStream(videoPath, { start, end });

    return { headers, videoStream };
  }


  async streamThumbnail(id: string) {
    const video = await this.videoRepository.findOneBy({ id: id });

    if (!video) {
      throw new NotFoundException('video not found');
    }

    const { thumbnailPath } = video;
    const thumbnailStream = fs.createReadStream('./' + thumbnailPath);

    const headers = {
      'Content-Type': 'image/*',
    }

    return { headers, thumbnailStream };

  }

  async getVides(): Promise<Video[]> {
    return await this.videoRepository.find();
  }

  async getVideo(id: string): Promise<Video> {
    const video = await this.videoRepository.findOneBy({ id: id });

    if (!video) {
      throw new NotFoundException('video not found');
    }

    return video;
  }
}
