import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity({name: 'courses'})
export class CoursesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    status: string

    @Column({type: 'int', nullable: true})
    sequence?: number

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
}