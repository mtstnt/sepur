import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>();
    const statusCode = exception instanceof HttpException ? exception.getStatus() : 500;

    response
      .status(statusCode)
      .json({
        error: exception.message,
      });
  }
}
