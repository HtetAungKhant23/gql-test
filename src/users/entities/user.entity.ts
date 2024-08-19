import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: 'id' })
  id: string;

  @Field(() => String, { description: 'user_name' })
  userName: string;

  @Field(() => String, { description: 'email' })
  email: string;

  @Field(() => String, { description: 'image', nullable: true })
  image: string;

  @Field(() => Boolean, { description: 'is_active' })
  isActive: boolean;
}
