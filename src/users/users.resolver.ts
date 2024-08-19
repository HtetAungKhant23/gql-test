import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { CurrentUser, IAuthUser } from 'src/decorator/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async uploadImage(
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload,
    @CurrentUser() user: IAuthUser,
  ) {
    const file = await image;
    return this.usersService.uploadImg(file, user.id);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'profile' })
  getProfile(@CurrentUser() user: IAuthUser) {
    return this.usersService.getProfile(user.id);
  }
}
