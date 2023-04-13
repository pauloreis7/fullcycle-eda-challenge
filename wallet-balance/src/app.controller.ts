import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';

import { PrismaService } from './database/prisma.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

interface UpdateBalancesDto {
  account_id_from: string;
  account_id_to: string;
  balance_account_id_from: number;
  balance_account_id_to: number;
}

@Controller('/balances')
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get(':accoundId')
  async getAccountBalance(@Param(':accoundId') id: string) {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    return { data: account.balance };
  }

  @MessagePattern('balances')
  async create(
    @Payload(new ValidationPipe())
    message: UpdateBalancesDto,
  ) {
    console.log(message);

    const updateFromBalance = this.prisma.account.update({
      where: {
        id: message.account_id_from,
      },
      data: { balance: message.balance_account_id_from },
    });

    const updateToBalance = this.prisma.account.update({
      where: {
        id: message.account_id_to,
      },
      data: { balance: message.balance_account_id_to },
    });

    await this.prisma.$transaction([updateFromBalance, updateToBalance]);

    return;
  }
}
