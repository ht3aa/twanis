import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class VideoUploadDto {
  @ApiProperty({
    description: 'title of the video. Should be unique From any other uploaded videos',  
  })
  @IsNotEmpty()
  @IsString()
  title: string
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string
  
}
