import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('PROGRAMMES')
export class Programme {
  @PrimaryColumn({ type: 'integer' })
  ID: number;

  @Column({ type: 'integer', nullable: true })
  ID_FORMAT: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  NAME: string;

  @Column({ type: 'integer', nullable: true })
  YEAR: number;

  @Column({ type: 'integer', nullable: true })
  ID_SUBGENRE: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  ID_IMDB: string;

  @Column({ type: 'integer', nullable: true })
  ID_PROGRAMME_TYPE: number;

  @Column({ type: 'varchar', length: 400, nullable: true })
  ORIGINAL_TITLE: string;

  @Column({ type: 'varchar', length: 400, nullable: true })
  ORIGINAL_TITLE_NOACCENT: string;

  @Column({ type: 'varchar', length: 4000, nullable: true })
  EXECUTIVE_PRODUCER: string;

  @Column({ type: 'varchar', length: 4000, nullable: true })
  HOST_CAST: string;

  @Column({ type: 'varchar', length: 4000, nullable: true })
  DIRECTOR: string;

  @Column({ type: 'text', nullable: true })
  SUMMARY: string;

  @Column({ type: 'text', nullable: true })
  DESCRIPTION: string;
}
