import { Entity, Column, PrimaryColumn } from 'typeorm';

// Entity for SIMPLY_CHANNELS table in MyETV database
@Entity({ name: 'SIMPLY_CHANNELS', schema: 'ETLMYETV' })
export class SimplyChannel {
  @PrimaryColumn({ type: 'number' })
  ID: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  NAME: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  COUNTRY_CODE: string;

  @Column({ type: 'number', nullable: true })
  ID_SIMPLY: number;

  @Column({ type: 'number', nullable: true })
  ID_MYETV: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  NAME_MYETV: string;

  @Column({ type: 'number', nullable: true })
  TO_DOWNLOAD: number;
}

