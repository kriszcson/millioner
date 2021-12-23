/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { UserDTO } from "src/user/dto/user.dto";
import { ApiBody } from "@nestjs/swagger";
import { createClient } from 'redis';

@Injectable()
export class AuthService {

    redisClient = createClient({ url: process.env.REDIS_URI });

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
    }

    async connectRedis() {
        this.redisClient.on('error', (err) => console.log('Redis Client Error', err));
        await this.redisClient.connect();
    }

    async validateUser(email: string, pass: string): Promise<any> {
        if (await this.userService.findByEmail(email)) {
            const user = await this.userService.findByEmail(email);
            return bcrypt.compare(pass, user.password);
        }
    }

    async login(user: UserDTO): Promise<UserDTO | any> {
        await this.connectRedis();

        const userHave = await this.userService.findByEmail(user.email)
        const payload = {
            email: user.email,
            sub: userHave._id,
            allAmount: userHave.allAmount
        };

        const token = this.jwtService.sign(payload);
        return this.setToken(token, userHave._id.toString())
            .then((status) => {
                return { status: status, id: userHave._id, token }
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                this.redisClient.disconnect();
            })
        /* 
        return {
            access_token: this.jwtService.sign(payload),
            email: user.email
        }; */
    }

    private async setToken(token: string, id: string) {
        //////////////////////////////////////////// key + value
        return Promise.resolve(this.redisClient.set(token, id));
    }

    @ApiBody({ type: UserDTO })
    async signUp(userDTO: UserDTO): Promise<UserDTO | any> {
        const newUser: UserDTO = await this.userService.createUser(userDTO);
        if (newUser) {
            return this.login(newUser);
        } else {
            return { message: 'Email exists!' }
        }
    }
}
