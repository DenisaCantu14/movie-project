import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AllUsersResult } from './results/all-users.result';
import { OneUserResult } from './results/one-user.result';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  async getAll(): Promise<AllUsersResult> {
    return {
      list: await this.userService.getAll(),
    };
  }

  @Get('/user/:id')
  async getById(@Param('id') id: string): Promise<OneUserResult> {
    return {
      data: await this.userService.getById(parseInt(id)),
    };
  }
}
