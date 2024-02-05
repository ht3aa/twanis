import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  videoId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roomPath: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hostName: string;
}
