import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TasksService, TasksResolver, PrismaService],
  exports: [TasksService],
})
export class TasksModule {}
