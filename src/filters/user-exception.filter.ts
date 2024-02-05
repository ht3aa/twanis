import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    console.log(req.path);

    if (req.path.endsWith('/login')) {
      if (exception.getStatus() === 401) {
        res.redirect('http://localhost:3000/user/login?alertType=error&alertMessage=Unauthorized');
      }

      if (exception.getStatus() === 400 || exception.getStatus() === 404) {
        res.redirect(
          `http://localhost:3000/user/login?alertType=error&alertMessage=${exception.message}`,
        );
      } else {
        res.redirect(
          'http://localhost:3000/user/login?alertType=error&alertMessage=Something went wrong',
        );
      }
    } else if (req.path.endsWith('/user')) {
      if (exception.getStatus() === 400 || exception.getStatus() === 404) {
        res.redirect(
          `http://localhost:3000/user/register?alertType=error&alertMessage=${exception.message}`,
        );
      } else {
        res.redirect(
          'http://localhost:3000/user/register?alertType=error&alertMessage=Something went wrong',
        );
      }
    }
  }
}
