import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity({name: 'assignments'})
export class AssignmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({type: 'uuid'})
    assignment_type_id: string

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