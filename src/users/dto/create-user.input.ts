import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'user_name' })
  userName: string;

  @Field(() => String, { description: 'email' })
  email: string;

  @Field(() => String, { description: 'password' })
  password: string;
}
