import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOneUserArgs } from '../@generated/prisma-nestjs-graphql/user/create-one-user.args';
import { FindFirstUserArgs } from '../@generated/prisma-nestjs-graphql/user/find-first-user.args';
import { User } from '../@generated/prisma-nestjs-graphql/user/user.model';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  user(@Args() args: FindFirstUserArgs) {
    return this.userService.findFirst(args);
  }

  @Mutation(() => User)
  async createUser(@Args() args: CreateOneUserArgs) {
    args.data.password = await bcrypt.hash(args.data.password, 10);
    return this.userService.createUser(args);
  }
}
