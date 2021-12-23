/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';

import { Model, Schema } from "mongoose";
import { UserDTO } from "./dto/user.dto";
import { User } from "./user.model";


@Injectable()
export class UserService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>) { }

    async getAll() {
        const allUsers = await this.userModel.find().exec();
        return allUsers;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }

    async createUser(userDTO: UserDTO) {
        const haveUser = await this.findByEmail(userDTO.email);
        if (haveUser) {
            return null;
        } else {
            const user = new this.userModel({
                email: userDTO.email,
                password: await this.hashPassword(userDTO.password),
                allAmount: 0
            })
            await user.save();
            return user;
        }
    }

    async updateUserPoints(id: Schema.Types.ObjectId, points: number) {
        const user = await this.userModel.findById(id).exec();
        user.allAmount += +points;

        return await this.userModel
            .findOneAndUpdate({ _id: id }, user, { useFindAndModify: false, new: true })
            .exec()
            || new NotFoundException(404, 'Account not found!');
    }

    async updateByEmail(userDTO: UserDTO) {
        return await this.userModel
            .findOneAndUpdate({ email: userDTO.email }, userDTO, { useFindAndModify: false, new: true })
            .exec()
            || new NotFoundException(404, 'Account not found!');
    }

    async deleteById(id: string) {
        return await this.userModel.findByIdAndDelete(id).exec() || new NotFoundException(404, 'Account not found!');
    }

    private async hashPassword(password: string) {
        const saltOfRounds = 10;;
        return await bcrypt.hash(password, saltOfRounds);
    }
}