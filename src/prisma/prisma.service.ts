import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService){
    super({
      datasources:{
        db:{
          url:'postgresql://admin:admin@localhost:5432/mydb?schema=public'
        },
      },
    });
  }
}