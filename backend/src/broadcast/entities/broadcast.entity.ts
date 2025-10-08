import { Entity, Column, PrimaryColumn } from 'typeorm';

/**
 * Table BROADCASTS dans MyETV
 * Contient les diffusions de programmes TV avec leurs audiences
 */
@Entity('BROADCASTS')
export class Broadcast {
  // Clé primaire
  @PrimaryColumn({ type: 'number', precision: 38, scale: 0 })
  ID_BROADCAST: number;

  // Date de diffusion
  @Column({ type: 'date', nullable: true })
  BROADCAST_DATE: Date;

  // Heure de début (format numérique, ex: 203000 = 20:30:00)
  @Column({ type: 'number', precision: 6, scale: 0, nullable: true })
  BEGIN_TIME: number;

  // Durée en minutes
  @Column({ type: 'number', precision: 6, scale: 0, nullable: true })
  DURATION: number;

  // Niveau de broadcast
  @Column({ type: 'number', precision: 1, scale: 0, nullable: true })
  BROADCAST_LEVEL: number;

  // ID de la région (Foreign Key vers REGIONS)
  @Column({ type: 'number', precision: 4, scale: 0, nullable: true })
  ID_REGION: number;

  // Type de programme
  @Column({ type: 'number', precision: 2, scale: 0, nullable: true })
  ID_PROGRAM_TYPE: number;

  // ID de la chaîne TV
  @Column({ type: 'number', precision: 5, scale: 0, nullable: true })
  ID_CHANNEL: number;

  // ID du genre
  @Column({ type: 'number', precision: 5, scale: 0, nullable: true })
  ID_GENRE: number;

  // ID de la description locale (potentiellement lié à Nota)
  @Column({ type: 'number', precision: 9, scale: 0, nullable: true })
  ID_LOCAL_DESCRIPTION: number;

  // ID de la description secondaire
  @Column({ type: 'number', precision: 9, scale: 0, nullable: true })
  ID_LOCAL_SECONDARY_DESCRIPTION: number;

  // ID de la cible (audience)
  @Column({ type: 'number', precision: 5, scale: 0, nullable: true })
  ID_TARGET: number;

  // Métriques d'audience (Rating, TVR, Reach, Share)
  @Column({ type: 'number', precision: 13, scale: 0, nullable: true })
  RAT_PERCENTAGE: number;

  @Column({ type: 'number', precision: 13, scale: 0, nullable: true })
  TVR_PERCENTAGE: number;

  @Column({ type: 'number', precision: 13, scale: 0, nullable: true })
  RCH_PERCENTAGE: number;

  @Column({ type: 'number', precision: 13, scale: 0, nullable: true })
  SHR_PERCENTAGE: number;

  @Column({ type: 'number', precision: 16, scale: 0, nullable: true })
  RAT_PERTHOUSAND: number;

  @Column({ type: 'number', precision: 16, scale: 0, nullable: true })
  TVR_PERTHOUSAND: number;

  @Column({ type: 'number', precision: 16, scale: 0, nullable: true })
  RCH_PERTHOUSAND: number;

  // Flags
  @Column({ type: 'number', precision: 1, scale: 0, nullable: true })
  COMPLETE: number;

  @Column({ type: 'number', precision: 1, scale: 0, nullable: true })
  LEAF: number;

  // Durée du programme parent
  @Column({ type: 'number', precision: 6, scale: 0, nullable: true })
  FATHER_DURATION: number;

  // Heure de fin (format numérique)
  @Column({ type: 'number', precision: 6, scale: 0, nullable: true })
  END_TIME: number;
}
