import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { OrganizationEntity } from './organization.entity'
import { ModuleEntity } from './modules.entity'

@Entity({ name: 'courses' })
export class CoursesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    status: string

    @ManyToOne(() => OrganizationEntity, { nullable: false, onDelete: 'CASCADE',})
    @JoinColumn({ name: 'organization_id' })
    organization: OrganizationEntity;

    @OneToMany(() => ModuleEntity, module => module.course, {nullable:true, cascade: true })
    modules: ModuleEntity[];

    @Column({ type: 'int', nullable: true })
    sequence?: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}