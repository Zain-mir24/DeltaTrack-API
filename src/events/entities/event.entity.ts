import { SerializeOptions } from "@nestjs/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('events')
@SerializeOptions({ excludeExtraneousValues: true })

export class Event {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    applicationId: number;
    @Column()
    type: string;
    @Column()
    message: string;
    @Column()
    stack: string;
    @Column()
    timestamp: Date;
  
    @Column({ type: 'int', nullable: true })
    lineno: number | null;
  
    @Column({ type: 'int', nullable: true })
    colno: number | null;
  
    @Column({ type: 'varchar', nullable: true })
    source: string | null;
}
