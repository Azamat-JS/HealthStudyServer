import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import { AssignmentEntity } from './assignments.entity'

@Entity({name: 'assignment_levels'})
export class AssignmentLevelEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({type: 'uuid'})
    level_id: string

    @Column({type: 'uuid'})
    unit_id: string

    @ManyToOne(() => AssignmentEntity, { nullable: false })
    @JoinColumn({ name: 'assignment_id' })
    assignment: AssignmentEntity

    @Column()
    status: string

    @Column()
    quantity: string

    @Column({type: 'int', nullable: true})
    sequence?: number

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}