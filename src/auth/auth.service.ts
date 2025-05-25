import { Injectable } from "@nestjs/common";
// import { user, Bookmark } from "generated/prisma";

@Injectable({})
export class AuthService{
    

signup(){
    return `you're signed up`
}

signin(){
    return `you are signed in`
}
}