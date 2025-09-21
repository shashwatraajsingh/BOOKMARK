import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService{
    constructor(private prisma:PrismaService, private jwt:JwtService, private config:ConfigService){}
    



async signup(dto: AuthDto){
    const hash =await argon.hash(dto.password);
    try{
    const user =await this.prisma.user.create({ // it will return the password hash and email if we want to stop 
                                                // getting password hash we have to use select as password hash can be danger
        data:{
            email: dto.email,
            hash, 
        },
        
        
    });
      return this.signToken(user.id, user.email);
    
    
}
catch(error){
    if ( error instanceof PrismaClientKnownRequestError){
        if(error.code==='P2002'){
            throw new ForbiddenException(
                'email already registered'
            )
        }
    }
    throw error 
}


}

async signin(dto: AuthDto){

    //find user by it's email
    const user =await this.prisma.user.findUnique({
        where:{
            email:dto.email,
        }
    })

    //if it exsist then login otherwise throw an exception
    if(!user){
        throw new ForbiddenException('user not found')
    }
    //compare password
    const pwMatches= await argon.verify(
        user.hash, 
        dto.password,
    )
    
    //if password is incorrect throw an error
    if(!pwMatches){
        throw new ForbiddenException('incorrect password');
    }

    return this.signToken(user.id, user.email);
}
    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = { sub: userId, email };
        const secret = this.config.get('JWT_SECRET');
        
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });

        return { access_token: token };

        

}
}

console.log('PrismaService imported successfully');


//installed argon2 
//this will generate the password hash, 