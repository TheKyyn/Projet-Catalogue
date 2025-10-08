import { Entity, Column, PrimaryColumn } from 'typeorm';

// Un Launch = un programme lancé sur une chaîne à une date donnée
@Entity('LAUNCHES')
export class Launch {
  @PrimaryColumn({ type: 'integer' })
  ID: number;

  // Titre local (traduit dans la langue du pays)
  @Column({ type: 'varchar', length: 300, nullable: true })
  LOCAL_TITLE: string;

  // Titre traduit
  @Column({ type: 'varchar', length: 300, nullable: true })
  TRANSLATED_TITLE: string;

  // ID de la chaîne TV
  @Column({ type: 'integer', nullable: true })
  ID_CHANNEL: number;

  // Date de lancement
  @Column({ type: 'date', nullable: true })
  LAUNCH_DATE: Date;

  // Durée du premier épisode (en minutes)
  @Column({ type: 'integer', nullable: true })
  FIRST_BROADCAST_DURATION: number;

  // Heure de début de la première diffusion
  @Column({ type: 'date', nullable: true })
  FIRST_BROADCAST_START_TIME: Date;

  // Environnement / Contexte (type TEXT/CLOB)
  @Column({ type: 'clob', nullable: true })
  ENVIRONMENT: string;

  // Présentateur/cast
  @Column({ type: 'varchar', length: 4000, nullable: true })
  HOST_CAST: string;

  // Nombre d'épisodes
  @Column({ type: 'integer', nullable: true })
  NUMBER_OF_EPISODES: number;

  // Durée typique d'un épisode
  @Column({ type: 'integer', nullable: true })
  TYPICAL_DURATION: number;

  // ID du programme (lien vers PROGRAMMES)
  // -> La colonne importante pour joindre avec Programme <-
  @Column({ type: 'integer', nullable: true })
  ID_PROGRAMME: number;

  // Date de création
  @Column({ type: 'date', nullable: true })
  CREATE_DATE: Date;

  // Date de dernière modification
  @Column({ type: 'date', nullable: true })
  UPDATE_DATE: Date;

  // Statut de publication
  @Column({ type: 'integer', nullable: true })
  ID_PUBLICATION_STATUS: number;

  // Statut de production
  @Column({ type: 'integer', nullable: true })
  ID_PRODUCTION_STATUS: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  IS_VALIDATE: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  IS_STILL_ON_AIR: number;
}
