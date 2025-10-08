import { Entity, Column, PrimaryColumn } from 'typeorm';

/**
 * Table REGIONS dans MyETV
 * Contient les informations sur les régions/pays de diffusion
 */
@Entity('REGIONS')
export class Region {
  // Clé primaire
  @PrimaryColumn({ type: 'number', precision: 4, scale: 0 })
  ID_REGION: number;

  // Nom de la région/pays
  @Column({ type: 'varchar', length: 60, nullable: true })
  NAME: string;

  // Timeslot de début
  @Column({ type: 'number', precision: 6, scale: 0, nullable: true })
  TIMESLOT_FROM: number;

  // ID du pays
  @Column({ type: 'number', precision: 4, scale: 0, nullable: true })
  ID_COUNTRY: number;

  // Nombre de décimales pour les statistiques
  @Column({ type: 'number', precision: 2, scale: 0, nullable: true })
  DECIMAL_PLACES: number;

  // Fuseau horaire GMT
  @Column({ type: 'number', precision: 2, scale: 0, nullable: true })
  GMT: number;

  // Commentaire
  @Column({ type: 'varchar', length: 2000, nullable: true })
  CCOMMENT: string;

  // Date de dernière mise à jour
  @Column({ type: 'date', nullable: true })
  LAST_UPDATE: Date;

  // Jour de réception
  @Column({ type: 'varchar', length: 250, nullable: true })
  RECEPTION_DAY: string;

  // Panel
  @Column({ type: 'varchar', length: 250, nullable: true })
  PANEL: string;

  // Publicité - Durée du programme
  @Column({ type: 'varchar', length: 3, nullable: true })
  ADV_PRG_DURATION: string;

  // Publicité - Rating
  @Column({ type: 'varchar', length: 3, nullable: true })
  ADV_PRG_RATING: string;

  // Publicité - Disponibilité
  @Column({ type: 'varchar', length: 3, nullable: true })
  ADV_AVAILABILITY: string;

  // Données overnight
  @Column({ type: 'varchar', length: 3, nullable: true })
  OVERNIGHT_DATA: string;

  // Accord publicitaire
  @Column({ type: 'varchar', length: 3, nullable: true })
  ADV_AGREEMENT: string;

  // Définition du code programme
  @Column({ type: 'varchar', length: 250, nullable: true })
  PROGRAM_CODE_DEF: string;

  // Avertissements
  @Column({ type: 'varchar', length: 500, nullable: true })
  WARNINGS: string;

  // Autres informations
  @Column({ type: 'varchar', length: 500, nullable: true })
  OTHER: string;
}

