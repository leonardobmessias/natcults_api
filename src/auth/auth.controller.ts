import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturUserDto } from 'src/user/dtos/returnUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ){}
    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto:LoginDto):Promise<ReturUserDto>{
        return new ReturUserDto(await this.authService.login(loginDto)) 
    }
}