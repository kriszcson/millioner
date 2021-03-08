import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { UserDTO } from "src/user/dto/user.dto";

@Controller('')
export class AuthController {


    @ApiBody({ type: UserDTO })
    @Post('login')
    logIn(
        @Body('email') email: string,
        @Body('password') password: string
    ) {

    }
}