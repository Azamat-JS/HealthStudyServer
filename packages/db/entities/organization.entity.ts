import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { CoursesEntity } from './courses.entity'

@Entity({ name: 'organizations' })
export class OrganizationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ unique: true })
    username: string

    @OneToMany(() => CoursesEntity, course => course.organization, { nullable: true, cascade: true })
    courses: CoursesEntity[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}