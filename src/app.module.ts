import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentsModule } from './assignments/assignments.module';
import { GroupsModule } from './groups/groups.module';
import { ConfigifyModule } from '@itgorillaz/configify';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 30
        }
      ]
    }),
    AssignmentsModule,
    GroupsModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
  ],
})
export class AppModule { }
