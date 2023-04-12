import { Controller, Get } from '@nestjs/common';

import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAccounts() {
    const accounts = await this.prisma.account.findMany();

    return { data: accounts };
  }
}
