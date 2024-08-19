import { Field, InputType, ObjectType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { Stream } from 'stream';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@InputType()
export class UploadImageInput {
  @Field(() => GraphQLUpload)
  image: Upload;
}

@ObjectType()
export class File {
  @Field(() => GraphQLUpload)
  avatar: Upload;
}
