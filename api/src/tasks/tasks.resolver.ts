import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOneTaskArgs } from '../@generated/prisma-nestjs-graphql/task/create-one-task.args';
import { FindManyTaskArgs } from '../@generated/prisma-nestjs-graphql/task/find-many-task.args';
import { Task } from '../@generated/prisma-nestjs-graphql/task/task.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {
  constructor(private readonly taskService: TasksService) {}

  @Query(() => [Task])
  @UseGuards(JwtAuthGuard)
  allTask(@Args() args: FindManyTaskArgs) {
    return this.taskService.findMany(args);
  }

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  async createTask(@Args() args: CreateOneTaskArgs) {
    return await this.taskService.createTask(args);
  }
}
