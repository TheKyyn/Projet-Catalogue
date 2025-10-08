import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrNotaLaunch } from './entities/br-nota-launch.entity';
import { SimplyBroadcast } from './entities/simply-broadcast.entity';
import { SimplyProgramme } from './entities/simply-programme.entity';

@Injectable()
export class BroadcastService {
  // Injection des repositories (connexion 'myetv')
  constructor(
    @InjectRepository(BrNotaLaunch, 'myetv')
    private brNotaLaunchRepo: Repository<BrNotaLaunch>,

    @InjectRepository(SimplyBroadcast, 'myetv')
    private simplyBroadcastRepo: Repository<SimplyBroadcast>,

    @InjectRepository(SimplyProgramme, 'myetv')
    private simplyProgrammeRepo: Repository<SimplyProgramme>,
  ) {}

  /**
   * Recherche des broadcasts MyETV à partir d'un ID_LAUNCH Nota
   * @param idLaunch - L'ID du launch dans Nota
   * @returns Les informations de broadcast trouvées
   */
  async searchByIdLaunch(idLaunch: number) {
    // 1. Chercher dans BR_NOTA_LAUNCH
    const brNotaLaunches = await this.brNotaLaunchRepo.find({
      where: {
        ID_LAUNCH: idLaunch,
      },
    });

    // Si aucun lien trouvé
    if (brNotaLaunches.length === 0) {
      return {
        message: 'Aucun broadcast trouvé pour cet ID_LAUNCH',
        idLaunch: idLaunch,
        results: [],
      };
    }

    // 2. Pour chaque lien trouvé, récupérer les données Simply
    const results: { brNotaLaunch: BrNotaLaunch }[] = [];

    for (const brNotaLaunch of brNotaLaunches) {
      // On a maintenant les infos de liaison
      // brNotaLaunch contient déjà plein d'infos (titre, genre, etc.)

      results.push({
        brNotaLaunch: brNotaLaunch,
        // Plus tard, on pourra ajouter les broadcasts et programmes Simply
      });
    }

    return {
      idLaunch: idLaunch,
      count: results.length,
      results: results,
    };
  }

  /**
   * Méthode temporaire pour insérer des données de test MyETV
   * À supprimer en production !
   */
  async seedTestData() {
    // Vérifier si des données existent déjà
    const existingCount = await this.brNotaLaunchRepo.count();
    if (existingCount > 0) {
      return {
        message: 'Des données MyETV existent déjà',
        count: existingCount,
      };
    }

    // *** 1. Créer des programmes Simply ***

    const simplyProgramme1 = this.simplyProgrammeRepo.create({
      ID: 1,
      ID_SIMPLY: 'SP_BB_001',
      ID_IMDB: 'tt0903747',
      ID_TMDB: '1396',
      TITLE: 'Breaking Bad',
      CATEGORY: 'Series',
      GENRE_1_ID: 1,
      GENRE_1_NAME: 'Drama',
      GENRE_2_ID: 2,
      GENRE_2_NAME: 'Crime',
      RELEASE_YEAR: 2008,
      PRODUCTION_COUNTRIES: 'United States',
      PRODUCTION_COMPANY: 'Sony Pictures Television',
      DESCRIPTION:
        'A high school chemistry teacher turned methamphetamine producer',
    });

    const simplyProgramme2 = this.simplyProgrammeRepo.create({
      ID: 2,
      ID_SIMPLY: 'SP_GOT_001',
      ID_IMDB: 'tt0944947',
      ID_TMDB: '1399',
      TITLE: 'Game of Thrones',
      CATEGORY: 'Series',
      GENRE_1_ID: 3,
      GENRE_1_NAME: 'Fantasy',
      GENRE_2_ID: 1,
      GENRE_2_NAME: 'Drama',
      RELEASE_YEAR: 2011,
      PRODUCTION_COUNTRIES: 'United States',
      PRODUCTION_COMPANY: 'HBO',
      DESCRIPTION:
        'Nine noble families fight for control of the lands of Westeros',
    });

    await this.simplyProgrammeRepo.save([simplyProgramme1, simplyProgramme2]);

    // *** 2. Créer des broadcasts Simply ***

    const simplyBroadcast1 = this.simplyBroadcastRepo.create({
      ID: 1,
      ID_SIMPLY: 101,
      ID_SIMPLY_PROGRAMME: 'SP_BB_001',
      ID_SIMPLY_CHANNEL: 5,
      BROADCAST_TITLE: 'Breaking Bad - Pilot',
      START_TIME: new Date('2008-01-20T20:00:00'),
      END_TIME: new Date('2008-01-20T21:00:00'),
      DURATION: 60,
      ACCURATE_START_TIME: new Date('2008-01-20T20:01:00'),
      ACCURATE_END_TIME: new Date('2008-01-20T20:58:00'),
    });

    const simplyBroadcast2 = this.simplyBroadcastRepo.create({
      ID: 2,
      ID_SIMPLY: 102,
      ID_SIMPLY_PROGRAMME: 'SP_BB_001',
      ID_SIMPLY_CHANNEL: 5,
      BROADCAST_TITLE: 'Breaking Bad - Season Finale',
      START_TIME: new Date('2013-09-29T21:00:00'),
      END_TIME: new Date('2013-09-29T22:15:00'),
      DURATION: 75,
      ACCURATE_START_TIME: new Date('2013-09-29T21:00:30'),
      ACCURATE_END_TIME: new Date('2013-09-29T22:15:00'),
    });

    const simplyBroadcast3 = this.simplyBroadcastRepo.create({
      ID: 3,
      ID_SIMPLY: 103,
      ID_SIMPLY_PROGRAMME: 'SP_GOT_001',
      ID_SIMPLY_CHANNEL: 10,
      BROADCAST_TITLE: 'Game of Thrones - Winter is Coming',
      START_TIME: new Date('2011-04-17T21:00:00'),
      END_TIME: new Date('2011-04-17T22:00:00'),
      DURATION: 60,
      ACCURATE_START_TIME: new Date('2011-04-17T21:02:00'),
      ACCURATE_END_TIME: new Date('2011-04-17T22:00:00'),
    });

    await this.simplyBroadcastRepo.save([
      simplyBroadcast1,
      simplyBroadcast2,
      simplyBroadcast3,
    ]);

    // *** 3. Créer les liens BR_NOTA_LAUNCH (la table CRUCIALE !) ***

    // Lien 1 : Breaking Bad Launch ID=1 → Simply Programme 1
    const brNotaLaunch1 = this.brNotaLaunchRepo.create({
      ID: 1,
      ID_LAUNCH: 1, // ← Launch Breaking Bad dans Nota
      ID_BR_PROGRAMME: 1,
      CHANNEL: 'HBO',
      ID_CHANNEL: 5,
      ORIGINAL_TITLE: 'Breaking Bad',
      LOCAL_TITLE: 'Breaking Bad',
      GENRE: 'Drama',
      ID_GENRE: 1,
      ID_IMDB: 'tt0903747',
      TYPICAL_DURATION: 47,
      LAUNCH_DATE: new Date('2008-01-20'),
      MATCHING_LEVEL: 5,
      CONFIDENCE: 98.5,
      MATCHING_STRATEGY: 'IMDB_MATCH',
    });

    // Lien 2 : Breaking Bad Launch ID=2 → Simply Programme 1 (rediffusion)
    const brNotaLaunch2 = this.brNotaLaunchRepo.create({
      ID: 2,
      ID_LAUNCH: 2, // ← Launch Breaking Bad (rediffusion) dans Nota
      ID_BR_PROGRAMME: 1,
      CHANNEL: 'AMC',
      ID_CHANNEL: 15,
      ORIGINAL_TITLE: 'Breaking Bad',
      LOCAL_TITLE: 'Breaking Bad - Rediffusion',
      GENRE: 'Drama',
      ID_GENRE: 1,
      ID_IMDB: 'tt0903747',
      TYPICAL_DURATION: 47,
      LAUNCH_DATE: new Date('2013-09-29'),
      MATCHING_LEVEL: 5,
      CONFIDENCE: 98.5,
      MATCHING_STRATEGY: 'IMDB_MATCH',
    });

    // Lien 3 : Game of Thrones Launch ID=3 → Simply Programme 2
    const brNotaLaunch3 = this.brNotaLaunchRepo.create({
      ID: 3,
      ID_LAUNCH: 3, // ← Launch Game of Thrones dans Nota
      ID_BR_PROGRAMME: 2,
      CHANNEL: 'HBO',
      ID_CHANNEL: 10,
      ORIGINAL_TITLE: 'Game of Thrones',
      LOCAL_TITLE: 'Le Trône de Fer',
      GENRE: 'Fantasy',
      ID_GENRE: 3,
      ID_IMDB: 'tt0944947',
      TYPICAL_DURATION: 55,
      LAUNCH_DATE: new Date('2011-04-17'),
      MATCHING_LEVEL: 5,
      CONFIDENCE: 99.2,
      MATCHING_STRATEGY: 'IMDB_MATCH',
    });

    await this.brNotaLaunchRepo.save([
      brNotaLaunch1,
      brNotaLaunch2,
      brNotaLaunch3,
    ]);

    return {
      message: 'Données de test MyETV insérées avec succès !',
      simplyProgrammes: 2,
      simplyBroadcasts: 3,
      brNotaLaunches: 3,
    };
  }
}
