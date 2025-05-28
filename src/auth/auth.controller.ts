import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){
        
    }

    //@HttpCode(HttpStatus.OK) if we want to return some number or any predefined 
    //alpha instead of 201
    @Post('signup') 
    signup(@Body() dto:AuthDto){
       
        return this.authService.signup(dto);
    }

    @Post('signin')
    login(@Body() dto:AuthDto){
        return this.authService.signin(dto)
    }
}