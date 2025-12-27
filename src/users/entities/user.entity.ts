import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SerializeOptions } from '@nestjs/common/serializer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity('users')
@SerializeOptions({ excludeExtraneousValues: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string; 

  @Column()
  email: string;

  
  @Column()
  @Exclude()
  password: string;

  @Column({type:'boolean',nullable:true,default:false})
  verified: boolean | null;

  @Column()
  role: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}