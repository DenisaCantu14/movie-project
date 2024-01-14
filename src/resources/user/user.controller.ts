import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AllUsersResult } from './results/all-users.result';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  async getAll(): Promise<AllUsersResult> {
    return {
      list: await this.userService.getAll(),
    };
  }
}
