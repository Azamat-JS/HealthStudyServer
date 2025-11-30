import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { OrganizationEntity } from './organization.entity'

@Entity({ name: 'groups' })
export class GroupEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ type: 'uuid' })
    course_id: string

    @Column({ type: 'uuid' })
    teacher_id: string

    @Column({ type: 'uuid' })
    assistant_id?: string

    @Column({ type: 'uuid' })
    room_id: string

    @Column({ type: 'uuid' })
    module_id: string

    @Column({ type: 'timestamp', nullable: true })
    starting_date?: Date

    @ManyToOne(() => OrganizationEntity, { nullable: false })
    @JoinColumn({ name: 'organization_id' })
    organization: OrganizationEntity;

    @Column()
    status: string

    @Column({ type: 'int', nullable: true })
    sequence?: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}