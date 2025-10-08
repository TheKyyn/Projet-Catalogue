import { Entity, Column, PrimaryColumn } from 'typeorm';

/**
 * Table LOCAL_DESCRIPTIONS_NOTA dans MyETV (schéma NSIETV)
 * Fait le lien entre les Launches Nota et les Broadcasts MyETV
 */
@Entity('LOCAL_DESCRIPTIONS_NOTA')
export class LocalDescriptionsNota {
  // Clé primaire
  @PrimaryColumn({ type: 'number', precision: 9, scale: 0 })
  LOCAL_DESCRIPTION_ID: number;

  // ID du genre Nota
  @Column({ type: 'number', precision: 5, scale: 0, nullable: true })
  NOTA_GENRE_ID: number;

  // ID du Launch Nota (clé étrangère vers LAUNCHES.ID)
  @Column({ type: 'number', precision: 20, scale: 0, nullable: true })
  NOTA_ID: number;

  // ID du broadcast MyETV (première apparition)
  @Column({ type: 'number', precision: 38, scale: 0, nullable: true })
  FIRST_APPEARANCE_BROADCAST_ID: number;

  // Flags
  @Column({ type: 'number', precision: 1, scale: 0, nullable: true, default: 0 })
  TO_UPDATE: number;

  @Column({ type: 'number', precision: 1, scale: 0, nullable: true, default: 0 })
  IS_MINISERIE: number;

  // Métadonnées
  @Column({ type: 'varchar', length: 1000, nullable: true })
  ORIGINAL_TITLE_OBSOLETE: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  TYPOLOGIE: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  SUB_TYPOLOGIE: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  DIRECTOR: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  PRODUCED_IN: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  PRODUCER: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  DISTRIBUTOR: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  ACTORS: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  FORMAT_TYPE: string;

  @Column({ type: 'timestamp', nullable: true })
  LAST_UPDATE: Date;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  FORMAT_TITLE: string;

  @Column({ type: 'number', precision: 5, scale: 0, nullable: true })
  ID_REGION: number;
}

