import { Injectable } from '@nestjs/common';
import { CreateOneUserArgs } from '../@generated/prisma-nestjs-graphql/user/create-one-user.args';
import { FindFirstUserArgs } from '../@generated/prisma-nestjs-graphql/user/find-first-user.args';
import { FindUniqueUserArgs } from '../@generated/prisma-nestjs-graphql/user/find-unique-user.args';
import { UpdateOneUserArgs } from '../@generated/prisma-nestjs-graphql/user/update-one-user.args';
import { User } from '../@generated/prisma-nestjs-graphql/user/user.model';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findFirst(args: FindFirstUserArgs): Promise<User | null> {
    return this.prisma.user.findFirst(args);
  }
  async findUnique(args: FindUniqueUserArgs): Promise<User | null> {
    return this.prisma.user.findUnique(args);
  }
  async createUser(args: CreateOneUserArgs): Promise<User> {
    return this.prisma.user.create(args);
  }
  async update(args: UpdateOneUserArgs): Promise<User> {
    return this.prisma.user.update(args);
  }
}
