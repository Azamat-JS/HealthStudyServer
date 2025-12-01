import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { OrganizationEntity } from './organization.entity'
import { UsersEntity } from './users.entity'
import { ModuleEntity } from './modules.entity'
import { GroupEntity } from './group.entity';

@Entity({ name: 'group_attendance' })
export class GroupAttendanceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => GroupEntity, { nullable: false })
    @JoinColumn({ name: 'group_id' })
    group: GroupEntity;

    @ManyToOne(() => UsersEntity, { nullable: false })
    @JoinColumn({ name: 'group_id' })
    student: UsersEntity;

    @Column({ type: 'uuid' })
    lesson: string;

    @ManyToOne(() => ModuleEntity, { nullable: false })
    @JoinColumn({ name: 'module_id' })
    module: ModuleEntity;

    @Column({ type: 'boolean', default: false })
    isAttended: boolean;

    @Column({ type: 'text', nullable: true })
    comment?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}