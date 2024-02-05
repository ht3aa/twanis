import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Redirect,
  Res,
  Req,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { AddUserDto } from './dto/user.add';
import { LoginUserDto } from './dto/user.login';
import { Response } from 'express';
import { UserExceptionFilter } from 'src/filters/user-exception.filter';

@ApiTags('api/v1/user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCreatedResponse({ description: 'User added successfully' })
  @ApiBadRequestResponse({ description: 'Email is not valid' })
  @ApiBadRequestResponse({ description: 'User with that email already exists' })
  @ApiBadRequestResponse({
    description: 'User creation failed. Please try again or text support team',
  })
  @UsePipes(ValidationPipe)
  @UseFilters(UserExceptionFilter)
  @Redirect('http://localhost:3000/user/login')
  @Post()
  async add(@Body() addUserDto: AddUserDto) {
    return await this.userService.add(addUserDto);
  }

  @ApiOkResponse({ description: 'Get User by username without password' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UsePipes(ValidationPipe)
  @Get('/username/:username')
  async findByUsername(@Param('username') username: string) {
    return await this.userService.findByUsername(username);
  }

  @ApiOkResponse({ description: 'Get User by username with password' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Email or password is incorrect' })
  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @ApiOkResponse({ description: 'Login successfully' })
  @ApiBadRequestResponse({ description: 'Email or password is incorrect' })
  @UseFilters(UserExceptionFilter)
  @UsePipes(ValidationPipe)
  @Redirect('http://localhost:3000/')
  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.login(loginUserDto);

    res.cookie('accessToken', token);
  }

  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
