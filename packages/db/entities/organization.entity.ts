import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { CoursesEntity } from './courses.entity'

@Entity({ name: 'organizations' })
export class OrganizationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToOne(() => CoursesEntity, courses => courses.organization, { nullable: true })
    @JoinColumn({ name: 'course_id' })
    course: CoursesEntity[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}