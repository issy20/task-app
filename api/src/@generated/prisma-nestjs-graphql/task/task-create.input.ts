import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutTasksInput } from '../user/user-create-nested-one-without-tasks.input';

@InputType()
export class TaskCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => UserCreateNestedOneWithoutTasksInput, {nullable:false})
    user!: UserCreateNestedOneWithoutTasksInput;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
