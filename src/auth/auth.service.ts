import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
// import { user, Bookmark } from "generated/prisma";

@Injectable({})
export class AuthService{
    constructor(private prisma:PrismaService){}
    

signup(){
    return `you're signed up`
}

signin(){
    return `you are signed in`
}
}