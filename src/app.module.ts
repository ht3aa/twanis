import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { DataSource } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [VideoModule, UserModule, TypeOrmModule.forRoot(typeormConfig),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: new ConfigService().get<string>('JWT_SECRET'),
      global: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
