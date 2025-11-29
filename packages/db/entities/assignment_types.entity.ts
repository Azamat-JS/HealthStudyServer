import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import { ModuleEntity } from './modules.entity'

@Entity({name: 'assignment_types'})
export class AssignmentTypesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

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