import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { CoursesEntity } from './courses.entity'

@Entity({ name: 'question_levels' })
export class QuestionLevelsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToOne(() => CoursesEntity)
    @JoinColumn({ name: 'course_id' })
    course: CoursesEntity;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}