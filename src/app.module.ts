import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [VideoModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
