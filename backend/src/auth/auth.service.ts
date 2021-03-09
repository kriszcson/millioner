import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { UserDTO } from "src/user/dto/user.dto";
import { ApiBody } from "@nestjs/swagger";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        if (await this.userService.findByEmail(email)) {
            const user = await this.userService.findByEmail(email);
            return bcrypt.compare(pass, user.password);
        }
    }

    async login(user: UserDTO): Promise<Object> {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
            email: user.email
        };
    }

    @ApiBody({ type: UserDTO })
    async signUp(userDTO: UserDTO): Promise<Object> {
        const newUser: UserDTO = await this.userService.createUser(userDTO);
        if (newUser) {
            return this.login(newUser);
        }
        else {
            return { message: 'Email exists!' }
        }
    }
}
