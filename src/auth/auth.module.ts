import {Global, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
// import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports:[JwtModule.register({})],
    controllers:[AuthController],
    providers:[AuthService],

})

export class AuthModule{};

