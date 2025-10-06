import { Entity, Column, PrimaryColumn } from 'typeorm';

// Table contenant les programmes Simply
// Ces données viennent de l'API Simply et sont stockées dans MyETV
@Entity('SIMPLY_PROGRAMME')
export class SimplyProgramme {
  // Clé primaire
  @PrimaryColumn({ type: 'integer' })
  ID: number;

  // ID du programme dans Simply (c'est cet ID qu'on va matcher avec EXTERNAL_IDS!)
  @Column({ type: 'varchar', length: 250, nullable: true })
  ID_SIMPLY: string;

  // IDs externes dans Simply
  @Column({ type: 'varchar', length: 150, nullable: true })
  ID_IMDB: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  ID_TMDB: string;

  // Titre du programme
  @Column({ type: 'varchar', length: 250, nullable: true })
  TITLE: string;

  // Titre de l'épisode (si c'est une série)
  @Column({ type: 'varchar', length: 250, nullable: true })
  EPISODE_TITLE: string;

  // Catégorie (Film, Série, Documentaire...)
  @Column({ type: 'varchar', length: 250, nullable: true })
  CATEGORY: string;

  // Genres (Simply peut avoir jusqu'à 2 genres)
  @Column({ type: 'integer', nullable: true })
  GENRE_1_ID: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  GENRE_1_NAME: string;

  @Column({ type: 'integer', nullable: true })
  GENRE_2_ID: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  GENRE_2_NAME: string;

  // Année de sortie
  @Column({ type: 'integer', nullable: true })
  RELEASE_YEAR: number;

  // Pays de production
  @Column({ type: 'varchar', length: 250, nullable: true })
  PRODUCTION_COUNTRIES: string;

  // Société de production
  @Column({ type: 'varchar', length: 300, nullable: true })
  PRODUCTION_COMPANY: string;

  // Crédits (acteurs, réalisateur...)
  @Column({ type: 'varchar', length: 500, nullable: true })
  CREDITS: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ID_SIMPLY_CREDITS: string;

  // Description du programme
  @Column({ type: 'varchar', length: 1000, nullable: true })
  DESCRIPTION: string;
}
