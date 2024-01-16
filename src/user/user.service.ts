import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddUserDto } from './dto/user.add';
import { LoginUserDto } from './dto/user.login';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  isEmailValid(email: string) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  async add(addUserDto: AddUserDto) {
    const { username, email, password } = addUserDto;

    if (!this.isEmailValid(email)) {
      throw new BadRequestException('Email is not valid');
    }

    try {
      this.userRepository.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new BadRequestException("User with that email already exists");
      } else {
        throw new BadRequestException(
          "User creation failed. Please try again or text support team",
        );
      }
    }

    return 'User added successfully';
  }

  async findByUsername(username: string, deleteUserPass = true) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (deleteUserPass) {
      delete user.password;
    }

    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (user) {
      delete user.password;

      return user;
    } else {
      throw new NotFoundException();
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findByUsername(loginUserDto.username, false);
    if (user) {
      if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
        throw new BadRequestException('Email or password is incorrect');
      }

      const payload = {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      return await this.jwtService.signAsync(payload);
    } else {
      throw new BadRequestException('Email or password is incorrect');
    }
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user) {
      await this.userRepository.remove(user);

      return 'User deleted successfully';
    } else {
      throw new NotFoundException();
    }
  }
}
