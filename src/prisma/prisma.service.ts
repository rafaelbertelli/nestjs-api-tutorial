import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // url: 'postgresql://postgres:132@localhost:5432/nest?schema=public',
          // url: 'postgresql://postgres:132@172.17.0.1:5432/nest?schema=public',
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
