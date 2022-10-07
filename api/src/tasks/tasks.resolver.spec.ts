import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

describe('TasksResolver', () => {
  let resolver: TasksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksResolver, PrismaService, TasksService],
    }).compile();

    resolver = module.get<TasksResolver>(TasksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
