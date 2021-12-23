import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { Schema } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';


@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }


    @Get()
    async getAll() {
        return await this.userService.getAll();
    }

    @Put('updatePoints/:id')
    async updateByEmail(
        @Param('id') id: Schema.Types.ObjectId,
        @Body('points') points: number
    ) {
        return await this.userService.updateUserPoints(id, points);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        return await this.userService.deleteById(id);
    }
}