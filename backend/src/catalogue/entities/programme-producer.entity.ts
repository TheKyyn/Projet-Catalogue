import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('PROGRAMMES_PRODUCERS')
export class ProgrammeProducer {
  @PrimaryColumn({ type: 'number' })
  ID: number;

  @Column({ type: 'number', nullable: true })
  ID_PROGRAMME: number;

  @Column({ type: 'number', nullable: true })
  ID_PRODUCER: number;

  @Column({ type: 'date', nullable: true })
  CREATE_DATE: Date;

  @Column({ type: 'date', nullable: true })
  UPDATE_DATE: Date;
}

