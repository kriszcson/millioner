/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }


    @Get()
    async getAll() {
        return await this.userService.getAll();
    }

    @Put('updatepoints')
    async updateByEmail(@Body() userDTO: UserDTO) {
        return await this.userService.updateUser(userDTO);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        return await this.userService.deleteById(id);
    }
}