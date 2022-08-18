import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address: string;

}
