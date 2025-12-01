import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { OrganizationEntity } from './organization.entity'
import { UsersEntity } from './users.entity'
import { ModuleEntity } from './modules.entity'
import { CoursesEntity } from './courses.entity';

@Entity({ name: 'groups' })
export class GroupEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => CoursesEntity, { nullable: false })
    @JoinColumn({ name: 'course_id' })
    course: CoursesEntity;

    @ManyToOne(() => UsersEntity, { nullable: false })
    @JoinColumn({ name: 'teacher_id' })
    teacher: UsersEntity;

    @ManyToOne(() => UsersEntity, { nullable: true })
    @JoinColumn({ name: 'assistant_id' })
    assistant?: UsersEntity | null;

    @Column({ type: 'uuid' })
    room_id: string;

    @ManyToOne(() => ModuleEntity, { nullable: false })
    @JoinColumn({ name: 'module_id' })
    module: ModuleEntity;

    @Column({ type: 'timestamp', nullable: true })
    starting_date?: Date;

    @ManyToOne(() => OrganizationEntity, { nullable: false })
    @JoinColumn({ name: 'organization_id' })
    organization: OrganizationEntity;

    @Column()
    status: string;

    @Column({ type: 'int', nullable: true })
    sequence: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}

