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
  Res,
  HttpCode,
  StreamableFile,
  UploadedFiles,
  Redirect,
  Delete,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { VideoUploadDto } from './dto/video.upload';
import type { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Video } from 'src/entity/video.entity';

@ApiTags('api/v1/video')
@Controller('video')
@UsePipes(ValidationPipe)
export class VideoController {
  constructor(private videoService: VideoService) {}

  @ApiOkResponse({ description: 'Video uploaded successfully' })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'videoFile', maxCount: 1 },
        { name: 'thumbnailFile', maxCount: 1 },
      ],
      {
        dest: './src/video/uploads',
      },
    ),
  )
  @Redirect('http://localhost:3000/', 301)
  async uploadVideo(
    @UploadedFiles() files: { videoFile: Express.Multer.File; thumbnailFile: Express.Multer.File },
    @Body() videoUploadDto: VideoUploadDto,
  ) {
    const { videoFile, thumbnailFile } = files;
    return await this.videoService.uploadVideo(videoFile[0], thumbnailFile[0], videoUploadDto);
  }

  @ApiResponse({ status: 206, description: 'Partial of the video streamed successfully' })
  @ApiBadRequestResponse({ description: 'Range header is required' })
  @ApiNotFoundResponse({ description: 'Video not found' })
  @Get(':id')
  @HttpCode(206)
  async streamVideo(
    @Param('id') id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { headers, videoStream } = await this.videoService.streamVideo(id, req);

    res.set(headers);

    return new StreamableFile(videoStream);
  }


  @Get('thumbnail/:id')
  async streamThumbnail(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { headers, thumbnailStream } = await this.videoService.streamThumbnail(id);

    res.set(headers);

    return new StreamableFile(thumbnailStream);
  }

  @ApiResponse({ status: 200, description: 'Videos data fetched successfully' })
  @Get()
  async getVides(): Promise<Video[]> {
    return await this.videoService.getVides();
  }

  @ApiResponse({ status: 200, description: 'Video data fetched successfully' })
  @ApiNotFoundResponse({ description: 'Video not found' })
  @Get(':id')
  async getVideo(@Param('id') id: string): Promise<Video> {
    return await this.videoService.getVideo(id);
  }

  @ApiResponse({ status: 200, description: 'Video deleted successfully' })
  @ApiNotFoundResponse({ description: 'Video not found' })
  @Delete(':id')
  async deleteVideo(@Param('id') id: string) {
    return await this.videoService.deleteVideo(id);
  }
}
