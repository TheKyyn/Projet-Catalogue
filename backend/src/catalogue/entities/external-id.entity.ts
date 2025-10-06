import { Entity, Column, PrimaryColumn } from 'typeorm';

// Table de mapping entre les IDs Nota et les IDs externes (IMDB, TMDB, Simply...)
// Cette table permet de faire le pont entre Nota et d'autres systèmes
@Entity('EXTERNAL_IDS')
export class ExternalId {
  // Clé primaire
  @PrimaryColumn({ type: 'integer' })
  ID: number;

  // ID du programme dans Nota (Foreign Key vers PROGRAMMES)
  @Column({ type: 'integer', nullable: true })
  ID_PROGRAMME: number;

  // Type d'ID externe (ex: 1=IMDB, 2=TMDB, 3=Simply...)
  @Column({ type: 'integer', nullable: true })
  ID_NAME: number;

  // La valeur de l'ID externe (ex: "tt0903747" pour Breaking Bad sur IMDB)
  @Column({ type: 'varchar', length: 100, nullable: true })
  VALUE: string;
}
