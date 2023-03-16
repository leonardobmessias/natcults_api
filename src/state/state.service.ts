import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from './entitites/state.entity';

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