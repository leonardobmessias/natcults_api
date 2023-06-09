import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.findUserByemail(createUserDto.email).catch(()=> undefined)
        if(user){
            throw new BadGatewayException('Email alredy registred!')
        }
        const saltOrRounds = 10;
        const newPasswordHash = await hash(createUserDto.password, saltOrRounds);
        return this.userRepository.save({ ...createUserDto, password: newPasswordHash, typeUser: UserType.User, })


    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }
    async findUserById(userId:number):Promise<UserEntity>{
        const user = await this.userRepository.findOne({where:{id:userId}})
        if(!user){
            throw new NotFoundException('user id not found')
        }
        return user
    }
    async getUserByIdUsingRelations(userId:number):Promise<UserEntity>{
        return  this.userRepository.findOne({
            where:{
                id:userId
            },
            relations:{
                addresses:{
                    city:{
                        state:true
                    }
                }
            }
        })
    }

    async findUserByemail(email:string):Promise<UserEntity>{
        const user = await this.userRepository.findOne({where:{email}})
        if(!user){
            throw new NotFoundException('user email not found')
        }
        return user
    }

}
