import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';

@Controller('user')
export class UserController {

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    getme(){
        return 'user info';
        
    }
}
