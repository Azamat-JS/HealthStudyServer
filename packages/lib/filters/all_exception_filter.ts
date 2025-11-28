import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message;
    }
    
    response.status(status).json({
      success: false,
      result: null,
      error: {
        code: status,
        message,
      },
    });
  }
}
