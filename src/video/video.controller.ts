import {
  Body,
  Param,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Get,
  Req,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoUploadDto } from './dto/video.upload';

@Controller('video')
@UsePipes(ValidationPipe)
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('videoFile', { dest: './src/uploads' }))
  async uploadVideo(
    @UploadedFile() videoFile: Express.Multer.File,
    @Body() videoUploadDto: VideoUploadDto,
  ) {
    return await this.videoService.uploadVideo(videoFile, videoUploadDto);
  }

  @Get(':id')
  async getVideo(@Param('id') id: string, @Req() req: Request) {
    const range = req.headers.get('ranger');
    if(!range) {
      throw new Error('Require range header');
    }

    return await this.videoService.getVideo(id, req);
  }
}
