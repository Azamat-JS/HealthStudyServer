import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { CoursesEntity } from './courses.entity';

@Entity({ name: 'modules' })
export class ModuleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToOne(() => CoursesEntity, { nullable: false })
    @JoinColumn({ name: 'course_id' })
    course: CoursesEntity

    @Column({ type: 'int', nullable: true })
    max_students?: number;

    @Column({ type: 'uuid' })
    isCore: string

    @Column()
    status: string

    @Column({ type: 'int' })
    sequence: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}