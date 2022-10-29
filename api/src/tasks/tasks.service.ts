import { Injectable } from '@nestjs/common';
import { CreateOneTaskArgs } from '../@generated/prisma-nestjs-graphql/task/create-one-task.args';
import { DeleteOneTaskArgs } from '../@generated/prisma-nestjs-graphql/task/delete-one-task.args';
import { FindFirstTaskArgs } from '../@generated/prisma-nestjs-graphql/task/find-first-task.args';
import { FindManyTaskArgs } from '../@generated/prisma-nestjs-graphql/task/find-many-task.args';
import { FindUniqueTaskArgs } from '../@generated/prisma-nestjs-graphql/task/find-unique-task.args';
import { PrismaService } from '../prisma.service';
import { Task } from '.prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findFirst(args: FindFirstTaskArgs): Promise<Task | null> {
    return this.prisma.task.findFirst(args);
  }

  async findMany(args: FindManyTaskArgs): Promise<Task[] | null> {
    return this.prisma.task.findMany(args);
  }

  async findUnique(args: FindUniqueTaskArgs): Promise<Task | null> {
    return this.prisma.task.findUnique(args);
  }

  async createTask(args: CreateOneTaskArgs): Promise<Task> {
    return this.prisma.task.create(args);
  }

  async deleteTask(args: DeleteOneTaskArgs) {
    return this.prisma.task.delete(args);
  }
}
