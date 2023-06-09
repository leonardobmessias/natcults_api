import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { StateEntity } from './entities/state.entity';

@Injectable()
export class StateService {

    constructor(
        @InjectRepository(StateEntity)
        private readonly userRepository: Repository<StateEntity>
    ) { }

    async getAllState(): Promise<StateEntity[]> {
        return this.userRepository.find()
    }



}
