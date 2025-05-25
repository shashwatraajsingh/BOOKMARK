import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(){
    super({
      datasources:{
        db:{
          url:'postgresql://admin:admin@localhost:5432/mydb?schema=public'
        },
      },
    });
  }
}