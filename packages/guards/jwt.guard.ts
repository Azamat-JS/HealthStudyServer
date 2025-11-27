import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from './../lib/config/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly config: AppConfig,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    let accessToken: string;

    if (authHeader?.startsWith('Bearer ')) {
      accessToken = authHeader.split(' ')[1];
    } else if (req.cookies['access_token']) {
      accessToken = req.cookies['access_token'];
    } else {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = await this.jwtService.verify(accessToken, {
        secret: this.config.jwtSecret,
      });
      req['user'] = payload;
      return true;
    } catch (err) {
      console.error('JWT verification failed:', err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
