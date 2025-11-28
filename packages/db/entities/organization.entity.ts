import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity({ name: 'assignments' })
export class AssignmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}