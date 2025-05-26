import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
// import { user, Bookmark } from "generated/prisma";

@Injectable({})
export class AuthService{
    constructor(private prisma:PrismaService){}
    



async signup(dto: AuthDto){
    const hash =await argon.hash(dto.password);
    try{
    const user =await this.prisma.user.create({ // it will return the password has and email if we want to stop 
                                                // getting password hash we have to use select as password hash can be danger
        data:{
            email: dto.email,
            hash, 
        },
        select:{
            id:true,
            email:true,
            createdAt:true, //for now we will use delete.user.hash
        }
        
    });
    
    return user;
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

    //if it exsist then login other throw an exception
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

    return {msg: 'you are logged in'};
}
}


//installed argon2 
//this will generate the password hash, 