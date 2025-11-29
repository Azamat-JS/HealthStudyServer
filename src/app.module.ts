import { Module } from '@nestjs/common';
import { AssignmentsModule } from './assignments/assignments.module';
import { GroupsModule } from './groups/groups.module';
import { ConfigifyModule } from '@itgorillaz/configify';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '../packages/lib/config/config';
import { CoursesModule } from './courses/courses.module';
import { OrganizationModule } from './organization/organization.module';
import { ModulesModule } from './modules/modules.module';
import { AssignmentLevelsModule } from './assignment_levels/assignment_levels.module';
import { AssignmentTypesModule } from './assignment_types/assignment_types.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forRootAsync({
      inject: [AppConfig],
      useFactory: (config: AppConfig) => ({
        type: 'postgres',
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUsername,
        password: config.dbPassword,
        database: config.dbName,
        autoLoadEntities: true,
        synchronize: true,
        retryAttempts: 3,
        entities: [
          path.join(__dirname, '..', 'packages', 'db', 'entities', '*.entity.{ts}')
        ],
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 30
        }
      ]
    }),
    AssignmentsModule,
    GroupsModule,
    UsersModule,
    CoursesModule,
    OrganizationModule,
    ModulesModule,
    AssignmentLevelsModule,
    AssignmentTypesModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
  ],
})
export class AppModule { }
