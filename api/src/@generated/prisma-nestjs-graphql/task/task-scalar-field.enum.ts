import { registerEnumType } from '@nestjs/graphql';

export enum TaskScalarFieldEnum {
    id = "id",
    title = "title",
    userId = "userId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(TaskScalarFieldEnum, { name: 'TaskScalarFieldEnum', description: undefined })
