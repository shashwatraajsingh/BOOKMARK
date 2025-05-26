import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global() // so that we don't have to define it everywhere

@Module({
  imports:[],
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
