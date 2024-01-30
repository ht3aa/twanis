import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class LoginExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();


    if(exception.getStatus() === 400 || exception.getStatus() === 404) {
      res.redirect('http://localhost:3000/user/login?alertType=error&alertMessage=Username or password is incorrect');
    } else {
      res.redirect('http://localhost:3000/user/login?alertType=error&alertMessage=Something went wrong');
    }


  }
}
