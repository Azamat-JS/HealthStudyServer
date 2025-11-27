import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity({name: 'assignment_types'})
export class AssignmentTypesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    weight: string

    @Column({type: 'uuid'})
    module_id: string

    @Column()
    status: string

    @Column({type: 'int', nullable: true})
    sequence?: number

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
}