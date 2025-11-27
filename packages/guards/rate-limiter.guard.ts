import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerStorage, ThrottlerRequest, ThrottlerOptions } from '@nestjs/throttler';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  private readonly logger = new Logger(CustomThrottlerGuard.name);
  constructor(
    protected readonly options: ThrottlerOptions[],
    storageService: ThrottlerStorage,
    reflector: Reflector,
  ) {
    super(options, storageService, reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    this.logger.log(`Request received from IP: ${request.ip}, URL: ${request.originalUrl}`);

    const throttlerConfig = this.options.find(t => t.name === 'default') || {
      name: 'default',
      limit: 10,
      ttl: 60000,
    };
    const limit = Number(throttlerConfig.limit);
    const ttl = Number(throttlerConfig.ttl);

    try {
      const tracker = await this.getTracker(request);
      this.logger.log(`Tracker: ${tracker}`);
      const key = `default:${tracker}`;
      this.logger.log(`Generated key: ${key}`);

      const throttlerRequest: ThrottlerRequest = {
        context,
        limit,
        ttl,
        throttler: { name: 'default', limit, ttl },
        blockDuration: 0,
        getTracker: (req: Record<string, any>) => this.getTracker(req),
        generateKey: () => key,
      };

      await this.handleRequest(throttlerRequest);
      this.logger.log(`Rate limit check: ${limit} requests per ${ttl}ms`);
      return true;
    } catch (error) {
      this.logger.error(`Rate limit exceeded: ${error.message}`);
      throw error;
    }
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
    return Promise.resolve(ip);
  }
}