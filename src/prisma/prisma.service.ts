import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    console.log('Prisma service initialized');
    await this.$connect();
  }

  async onModuleDestroy() {
    console.log('Prisma service disconnected.');
    await this.$disconnect();
  }
}
