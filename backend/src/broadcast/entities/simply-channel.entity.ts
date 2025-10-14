import { Entity, Column, PrimaryColumn } from 'typeorm';

// Entity for SIMPLY_CHANNELS table in MyETV database
@Entity({ name: 'SIMPLY_CHANNELS', schema: 'ETLMYETV' })
export class SimplyChannel {
  @PrimaryColumn({ type: 'number' })
  ID: number;

  @Column({ type: 'number', nullable: true })
  ID_SIMPLY: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  NAME: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  COUNTRY_CODE: string;
}

