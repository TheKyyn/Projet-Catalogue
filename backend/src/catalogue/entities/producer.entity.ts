import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('PRODUCERS')
export class Producer {
  @PrimaryColumn({ type: 'number' })
  ID: number;

  @Column({ type: 'varchar', length: 900, nullable: true })
  NAME: string;

  @Column({ type: 'date', nullable: true })
  CREATE_DATE: Date;

  @Column({ type: 'date', nullable: true })
  UPDATE_DATE: Date;
}

