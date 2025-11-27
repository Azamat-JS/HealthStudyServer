import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentsModule } from './assignments/assignments.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [AssignmentsModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
