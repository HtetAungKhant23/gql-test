import { HttpStatus } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IResponseMetadata {
  @Field(() => HttpStatus)
  statusCode: HttpStatus;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class Responser {
  @Field(() => Object)
  _data: object;

  @Field(() => Object)
  _metaData: IResponseMetadata;
}
