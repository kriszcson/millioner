/* eslint-disable prettier/prettier */
import { Body } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from './auth.service';
/* eslint-disable prettier/prettier */
import { LocalAuthGuard } from './local-auth.guard';
/* eslint-disable prettier/prettier */
import { UseGuards, Request, Get } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { Controller, Post } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { UserDTO } from "src/user/dto/user.dto";

@Controller('')
export class AuthController {

    constructor(private authService: AuthService) { }


    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: UserDTO })
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.body);
    }

    @ApiBody({ type: UserDTO })
    @Post('register')
    async register(@Request() req) {
        return await this.authService.signUp(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}