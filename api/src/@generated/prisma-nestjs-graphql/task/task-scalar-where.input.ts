import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class TaskScalarWhereInput {

    @Field(() => [TaskScalarWhereInput], {nullable:true})
    AND?: Array<TaskScalarWhereInput>;

    @Field(() => [TaskScalarWhereInput], {nullable:true})
    OR?: Array<TaskScalarWhereInput>;

    @Field(() => [TaskScalarWhereInput], {nullable:true})
    NOT?: Array<TaskScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    userId?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}
