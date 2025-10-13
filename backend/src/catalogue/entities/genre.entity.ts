import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('GENRES')
export class Genre {
  @PrimaryColumn({ type: 'number' })
  ID: number;

  @Column({ type: 'varchar', length: 75, nullable: true })
  NAME: string;

  @Column({ type: 'date', nullable: true })
  CREATE_DATE: Date;

  @Column({ type: 'date', nullable: true })
  UPDATE_DATE: Date;
}

