import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import * as mongoose from "mongoose";

export class UserDTO {

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
    readonly _id: mongoose.Schema.Types.ObjectId;

    @IsEmail()
    @ApiProperty({
        type: String,
        description: 'The email of the user.',
        default: '',
        example: '1@1.1'
    })
    readonly email: string;

    @ApiProperty({
        type: String,
        description: 'The password of the user.',
        default: '',
        example: '1'
    })
    readonly password: string;
}