import {
  Controller,
  Get,
  HttpException,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { PrismaService } from './database/prisma.service';

interface UpdateBalancesDto {
  Payload: {
    account_id_from: string;
    account_id_to: string;
    balance_account_id_from: number;
    balance_account_id_to: number;
  };
}

@Controller('/balances')
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get(':accountId')
  async getAccountBalance(@Param('accountId') accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new HttpException('Account not found!', 404);
    }

    return { data: account.balance };
  }

  @MessagePattern('balances')
  async create(
    @Payload(new ValidationPipe())
    message: UpdateBalancesDto,
  ) {
    try {
      const updateFromBalance = this.prisma.account.update({
        where: {
          id: message.Payload.account_id_from,
        },
        data: { balance: message.Payload.balance_account_id_from },
      });

      const updateToBalance = this.prisma.account.update({
        where: {
          id: message.Payload.account_id_to,
        },
        data: { balance: message.Payload.balance_account_id_to },
      });

      await this.prisma.$transaction([updateFromBalance, updateToBalance]);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
