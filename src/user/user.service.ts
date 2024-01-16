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

  async add(addUserDto: AddUserDto) {
    const { username, email, password } = addUserDto;

    this.userRepository.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

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
        throw new BadRequestException("Email or password is incorrect");
      }

      const payload = {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      return await this.jwtService.signAsync(payload);
    } else {
        throw new BadRequestException("Email or password is incorrect");
    }
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user) {
      await this.userRepository.remove(user);

      return "User deleted successfully";
    } else {
      throw new NotFoundException();
    }
  }
}
