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
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoUploadDto } from './dto/video.upload';
import type { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('api/v1/video')
@Controller('video')
@UsePipes(ValidationPipe)
export class VideoController {
  constructor(private videoService: VideoService) {}

  @ApiOkResponse({ description: 'Video uploaded successfully' })
  @Post()
  @UseInterceptors(FileInterceptor('videoFile', { dest: './src/uploads' }))
  async uploadVideo(
    @UploadedFile() videoFile: Express.Multer.File,
    @Body() videoUploadDto: VideoUploadDto,
  ) {
    return await this.videoService.uploadVideo(videoFile, videoUploadDto);
  }

  @ApiResponse({ status: 206, description: 'Partial of the video streamed successfully' })
  @ApiBadRequestResponse({ description: 'Range header is required' })
  @ApiNotFoundResponse({ description: 'Video not found' })
  @Get(':id')
  @HttpCode(206)
  async getVideo(
    @Param('id') id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { headers, videoStream } = await this.videoService.getVideo(id, req);

    res.set(headers);

    return new StreamableFile(videoStream);
  }
}
