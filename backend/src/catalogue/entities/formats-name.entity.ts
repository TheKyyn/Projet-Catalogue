import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('FORMATS')
export class FormatsName {
  @PrimaryColumn({ type: 'integer' })
  ID: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  NAME: string;

  @Column({ type: 'varchar', nullable: true })
  FORMAT_TITLE: string;

  @Column({ type: 'date', nullable: true })
  FORMAT_TITLE_UPDATE_DATE: Date;

  @Column({ type: 'integer', nullable: true })
  FRANCHISES: number;
}
