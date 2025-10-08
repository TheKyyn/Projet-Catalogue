import { Entity, Column, PrimaryColumn } from 'typeorm';

// TABLE CRUCIALE : Fait le lien entre les Launches Nota et les données MyETV
// C'est ici qu'on trouve quel Launch Nota correspond à quel programme Simply
@Entity('BR_NOTA_LAUNCH')
export class BrNotaLaunch {
  // Clé primaire
  @PrimaryColumn({ type: 'integer' })
  ID: number;

  // *** LES DEUX COLONNES LES PLUS IMPORTANTES ***

  // ID du Launch dans Nota (Foreign Key vers LAUNCHES.ID)
  @Column({ type: 'integer', nullable: true })
  ID_LAUNCH: number;

  // ID du programme dans BR_PROGRAMME (qui lui-même est lié à Simply)
  @Column({ type: 'integer', nullable: true })
  ID_BR_PROGRAMME: number;

  // Informations sur la chaîne TV
  @Column({ type: 'varchar', length: 250, nullable: true })
  CHANNEL_GROUP: string;

  @Column({ type: 'integer', nullable: true })
  ID_CHANNEL_GROUP: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  CHANNEL: string;

  @Column({ type: 'integer', nullable: true })
  ID_CHANNEL: number;

  // Titres (pour faciliter la recherche/debug)
  @Column({ type: 'varchar', length: 250, nullable: true })
  FORMAT_TITLE: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  LOCAL_TITLE: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  ORIGINAL_TITLE: string;

  // Genres
  @Column({ type: 'varchar', length: 250, nullable: true })
  GENRE: string;

  @Column({ type: 'integer', nullable: true })
  ID_GENRE: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  SUBGENRE: string;

  @Column({ type: 'integer', nullable: true })
  ID_SUBGENRE: number;

  // ID IMDB (pour cross-référence)
  @Column({ type: 'varchar', length: 100, nullable: true })
  ID_IMDB: string;

  // Durée typique d'un épisode
  @Column({ type: 'integer', nullable: true })
  TYPICAL_DURATION: number;

  // Métadonnées sur le matching (comment les données ont été liées)
  @Column({ type: 'integer', nullable: true })
  MATCHING_LEVEL: number;

  @Column({ type: 'date', nullable: true })
  LAUNCH_DATE: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ORIGINAL_TYPENAME: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  DEVELOPED_IN: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  MATCHING_STRATEGY: string;

  // Niveau de confiance du matching (0.00 à 100.00)
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  CONFIDENCE: number;

  // Détails du matching (JSON ou texte)
  @Column({ type: 'clob', nullable: true })
  MATCHING_DETAILS: string;

  // Casting et production
  @Column({ type: 'varchar', length: 4000, nullable: true })
  HOST_CAST: string;

  @Column({ type: 'varchar', length: 4000, nullable: true })
  PRODUCED_IN: string;

  @Column({ type: 'varchar', length: 4000, nullable: true })
  PRODUCERS: string;

  // ID du programme Nota (pour cross-référence)
  @Column({ type: 'integer', nullable: true })
  ID_NOTA_PROGRAMME: number;
}
