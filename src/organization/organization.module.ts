import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { ConfigifyModule } from '@itgorillaz/configify';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../packages/db/entities/organization.entity';

@Module({
    imports: [
      ConfigifyModule.forRootAsync(),
      TypeOrmModule.forFeature([OrganizationEntity]),
    ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
