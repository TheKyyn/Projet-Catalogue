import { Entity, Column, PrimaryColumn } from 'typeorm';

// Table contenant les diffusions (broadcasts) des programmes à la TV
// Une diffusion = un programme diffusé sur une chaîne à une heure précise
@Entity('SIMPLY_BROADCAST')
export class SimplyBroadcast {
  // Clé primaire
  @PrimaryColumn({ type: 'integer' })
  ID: number;

  // ID de la diffusion dans Simply
  @Column({ type: 'integer', nullable: true })
  ID_SIMPLY: number;

  // ID du programme Simply (Foreign Key vers SIMPLY_PROGRAMME.ID_SIMPLY)
  // C'est le lien entre le broadcast et le programme!
  @Column({ type: 'varchar', length: 50, nullable: true })
  ID_SIMPLY_PROGRAMME: string;

  // ID de la chaîne TV dans Simply
  @Column({ type: 'integer', nullable: true })
  ID_SIMPLY_CHANNEL: number;

  // Titre du broadcast (peut être différent du titre du programme)
  @Column({ type: 'varchar', length: 250, nullable: true })
  BROADCAST_TITLE: string;

  // Heure annoncée du début de diffusion
  @Column({ type: 'date', nullable: true })
  START_TIME: Date;

  // Heure de fin de diffusion
  @Column({ type: 'date', nullable: true })
  END_TIME: Date;

  // Durée de la diffusion (en minutes, calculée par Simply)
  @Column({ type: 'varchar', length: 50, nullable: true })
  DURATION_SIMPLY: string;

  // Durée réelle (en minutes, stockée en nombre)
  @Column({ type: 'integer', nullable: true })
  DURATION: number;

  // Heure réelle du début de la diffusion
  @Column({ type: 'date', nullable: true })
  ACCURATE_START_TIME: Date;

  @Column({ type: 'date', nullable: true })
  ACCURATE_END_TIME: Date;
}
