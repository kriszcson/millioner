import { Controller, Get, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './user/dto/user.dto';

@ApiTags('authentication')
@Controller()
export class AppController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @ApiOkResponse({ description: 'Authorization successful.' })
    @ApiForbiddenResponse({ description: 'Unathorized.' })
    @Post('auth/login')
    @ApiBody({ type: UserDTO })
    async login(@Body() userDTO: UserDTO
    ) {
        return await this.authService.login(userDTO);
    }

    @ApiOkResponse({ description: 'Authorization successful.' })
    @ApiForbiddenResponse({ description: 'Unathorized.' })
    @Post('auth/signup')
    @ApiBody({ type: UserDTO })
    async signUp(
        @Body() userDTO: UserDTO
    ) {
        return await this.authService.signUp(userDTO);
    }

    @ApiOkResponse({ description: 'Sussessfully returned data.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get('')
    async welcome() {
        const userDTO = new UserDTO('1@1.1', '1');
        return await this.authService.login(userDTO);
    }
}