import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('SUBGENRES')
export class Subgenre {
  @PrimaryColumn({ type: 'number' })
  ID: number;

  @Column({ type: 'varchar', length: 75, nullable: true })
  NAME: string;

  @Column({ type: 'number', nullable: true })
  ID_GENRE: number;

  @Column({ type: 'date', nullable: true })
  CREATE_DATE: Date;

  @Column({ type: 'date', nullable: true })
  UPDATE_DATE: Date;
}

