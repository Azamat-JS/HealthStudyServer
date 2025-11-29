import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity({ name: 'users' })
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    phone: string

    @Column()
    password: string

    @Column({ nullable: true })
    role?: string

    @Column({ nullable: true })
    access?: string

    @Column({ nullable: true })
    code?: string

    @Column({ nullable: true })
    token?: string

    @Column({ type: 'timestamp', nullable: true })
    date_of_birth?: Date

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}