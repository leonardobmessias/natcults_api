import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReturUserDto } from './dtos/returnUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto) {

        return this.userService.createUser(createUser)
    }
    @Get()
    async getAllUser(): Promise<ReturUserDto[]> {
        return (await this.userService.getAllUser()).map((userEntity)=> new ReturUserDto(userEntity))
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId:number):Promise<ReturUserDto>{
        return  new ReturUserDto(await this.userService.getUserByIdUsingRelations(userId)) 
    }
}
