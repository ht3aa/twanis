import { 
  Controller, 
  Get, 
  Post,
  Body, 
  Param,
  Delete, 
  UsePipes, 
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AddUserDto } from './dto/user.add';
import { LoginUserDto } from './dto/user.login';

@ApiTags('api/v1/user')
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @ApiCreatedResponse({ description: 'User added successfully' })
  @UsePipes(ValidationPipe)
  @Post()
  async add(
    @Body() addUserDto: AddUserDto,
  ) {
    return await this.userService.add(addUserDto);
  }

  
  @ApiOkResponse({ description: "Get User by username without password" })
  @ApiNotFoundResponse({ description: "User not found" })
  @UsePipes(ValidationPipe)
  @Get('/username/:username')
  async findByUsername(
    @Param('username') username: string,
  ) {
    return await this.userService.findByUsername(username);
  }
  
  @ApiOkResponse({ description: "Get User by username with password" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiBadRequestResponse({ description: "Email or password is incorrect" })
  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @ApiOkResponse({ description: "Login successfully" })
  @ApiBadRequestResponse({ description: "Email or password is incorrect" })
  @UsePipes(ValidationPipe)
  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ) {
    return await this.userService.login(loginUserDto);
  }
 
  @ApiOkResponse({ description: "User deleted successfully" })
  @ApiNotFoundResponse({ description: "User not found" })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}

