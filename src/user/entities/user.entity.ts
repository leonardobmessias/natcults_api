import { AddressEntity } from "../../address/address.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({name:"name", nullable:false})
    name:string
    
    @Column({name:"email", nullable:false})
    email:string

    @Column({name:'phone', nullable:false})
    phone:string

    @Column({name:"cpf", nullable:false})
    cpf:string

    @Column({name:"password", nullable:false})
    password:string

    @Column({name:'type_user',nullable:false})
    typeUser:number

    @CreateDateColumn({name:'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updateAt:Date

    @OneToMany(()=>AddressEntity,(address)=> address.user)
    addresses?: AddressEntity[]
}