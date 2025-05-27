// import { ConfigService } from "@nestjs/config";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";


// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private configService: ConfigService) {
//     super({
//       secretOrKey: configService.get('JWT_SECRET'),
//       jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'), //instead of ExtractJwt.fromAuthHeaderAsBearerToken()
//       ignoreExpiration: true, //Set to true means expired tokens will still be accepted for production it must be false
//     });
//   }

//   validate(payload: any) {
//     console.log(payload);
//     return payload;
//   }
// }

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StrategyOptionsWithoutRequest } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt,') {
  constructor(configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in configuration');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      ignoreExpiration: false,
    } satisfies StrategyOptionsWithoutRequest);
  }

  async validate(payload: any) {
    console.log({
        payload,
    });
    
    return payload;
  }
}