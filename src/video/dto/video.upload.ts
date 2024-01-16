import { IsNotEmpty, IsString } from "class-validator"
export class VideoUploadDto {

  @IsNotEmpty()
  @IsString()
  title: string
  
  @IsNotEmpty()
  @IsString()
  description: string
  
}
