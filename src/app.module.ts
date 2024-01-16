import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [VideoModule, UserModule, TypeOrmModule.forRoot(typeormConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
