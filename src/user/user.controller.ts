import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
  getMe() {
    
      console.log('✅ req.use')
    
    return 'code is good';
  }
}
