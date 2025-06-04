// import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { User } from 'generated/prisma';
// import { GetUser } from 'src/auth/decorator';
// import { JwtGuard } from 'src/auth/guard';

import {
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../generated/prisma';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';


@UseGuards(JwtGuard)
@Controller('user')
export class UserController {

    @Get('me')
    
  getMe(@GetUser() user:User) {
   
   
    
    
      
    
    return user;
  }
  @Patch()
  editUser(){}
}

// @Patch
// editUser(){}
