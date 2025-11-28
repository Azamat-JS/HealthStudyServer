import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity({name: 'bills'})
export class BillsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'uuid'})
    user_id: string

    @Column({type: 'uuid'})
    group_student_id: string

    @Column({type: 'uuid'})
    module_id: string

    @Column({type: 'uuid'})
    group_id: string

    @Column()
    status: string

    @Column()
    amount: string

    @Column({type: 'timestamp'})
    deadline: Date

    @Column({type: 'timestamp'})
    when: Date

    @Column({type: 'uuid'})
    teacher_id: string

    @Column({type: 'uuid'})
    assistant_id: string

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
}