import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigifyModule } from '@itgorillaz/configify';
import { UsersEntity } from '../../packages/db/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from '../../packages/lib/config/config';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.registerAsync({
      inject: [AppConfig],
      useFactory: (config: AppConfig) => ({
        secret: config.jwtSecret,
        signOptions: { expiresIn: 60 },
      }),
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, AppConfig],
})
export class UsersModule { }
