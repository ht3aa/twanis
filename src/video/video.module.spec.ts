import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import * as fs from 'fs';

describe('VideoController', () => {
  let controller: VideoController;
  let service: VideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [VideoService],
    }).compile();

    controller = module.get<VideoController>(VideoController);
    service = module.get<VideoService>(VideoService);
  });

  describe('upload', () => {
    it('should return the a successful response', async () => {
      const result = "video uploaded successfully";
      jest.spyOn(service, 'uploadVideo').mockImplementation(() => Promise.resolve(result));

      const videoFileBody = {
        title: 'test video',
        description: 'test video description',
      }

      const videoFile: Express.Multer.File = {
        fieldname: 'videoFile',
        filename: 'test.mp4',
        path: './test.mp4',
        originalname: 'test video',
        encoding: '7bit',
        mimetype: 'video/mp4',
        buffer: Buffer.from('test video'),
        size: 1024,
        stream: fs.createReadStream('test video'),
        destination: './uploads',
      }




      expect(controller.uploadVideo(videoFile, videoFileBody)).toBe(result);
    });
  });
});
