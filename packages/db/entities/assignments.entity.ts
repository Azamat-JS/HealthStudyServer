import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne} from 'typeorm'
import { ModuleEntity } from './modules.entity'

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

    @ManyToOne(() => ModuleEntity, { nullable: false })
    @JoinColumn({ name: 'module_id' })
    module: ModuleEntity

    @Column()
    status: string

    @Column({type: 'int', nullable: true})
    sequence?: number

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}