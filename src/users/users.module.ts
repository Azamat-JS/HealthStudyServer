import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigifyModule } from '@itgorillaz/configify';
import { UsersEntity } from '../../packages/db/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
