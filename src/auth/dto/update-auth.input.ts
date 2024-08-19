import { InputType, Field, PartialType } from '@nestjs/graphql';
import { SignUpInput } from './singup-input';

@InputType()
export class UpdateAuthInput extends PartialType(SignUpInput) {
  @Field(() => String)
  id: string;
}
