import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Programme } from './entities/programme.entity';
import { Launch } from './entities/launch.entity';

@Injectable()
export class CatalogueService {
  // *** CONSTRUCTEUR : Pour injecter les repositories ***
  constructor(
    @InjectRepository(Programme, 'nota')
    private programmeRepo: Repository<Programme>,

    @InjectRepository(Launch, 'nota')
    private launchRepo: Repository<Launch>,
  ) {}

  // *** MÉTHODE : Recherche par titre ***
  // Cette fonction sera appelée depuis le controller
  async searchByTitle(title: string) {
    // 1. Chercher les programmes dont le titre contient la recherche
    const programmes = await this.programmeRepo.find({
      where: {
        ORIGINAL_TITLE: Like(`%${title}%`), // LIKE '%titre%' en SQL
      },
      take: 20, // Limite à 20 résultats
    });

    // 2. Pour chaque programme, récupérer ses launches
    const results: { programme: Programme; launches: Launch[] }[] = []; // Typage du tableau results

    // ← LA BOUCLE FOR : On parcourt chaque programme trouvé
    for (const programme of programmes) {
      // Chercher tous les launches de CE programme
      const launches = await this.launchRepo.find({
        where: {
          ID_PROGRAMME: programme.ID,
        },
      });

      // Construire l'objet résultat
      results.push({
        programme: programme,
        launches: launches,
      });
    }

    return results;
  }

  async seedTestData() {
    const existingCount = await this.programmeRepo.count();
    if (existingCount > 0) {
      return { message: 'Des données existent déjà', count: existingCount };
    }

    const programme1 = this.programmeRepo.create({
      ID: 1,
      ORIGINAL_TITLE: 'Breaking Bad',
      NAME: 'Breaking Bad',
      YEAR: 2000,
      ID_IMDB: 'tt0903747',
      SUMMARY:
        'Un professeur de chimie se lance dans la production de méthamphétamine',
      DESCRIPTION: 'Série dramatique créée par Vince Gilligan',
    });

    const programme2 = this.programmeRepo.create({
      ID: 2,
      ORIGINAL_TITLE: 'Game of Thrones',
      NAME: 'Game of Thrones',
      YEAR: 2011,
      ID_IMDB: 'tt0944947',
      SUMMARY:
        'Neuf familles nobles se disputent le contrôle des terres de Westeros',
      DESCRIPTION:
        'Série fantastique basée sur les romans de George R.R. Martin',
    });

    const programme3 = this.programmeRepo.create({
      ID: 3,
      ORIGINAL_TITLE: 'The Office',
      NAME: 'The Office',
      YEAR: 2005,
      ID_IMDB: 'tt0386676',
      SUMMARY: 'Mockumentaire sur le quotidien des employés de bureau',
      DESCRIPTION: 'Comédie américaine',
    });

    await this.programmeRepo.save([programme1, programme2, programme3]);

    const launch1 = this.launchRepo.create({
      ID: 1,
      ID_PROGRAMME: 1,
      LOCAL_TITLE: 'Breaking Bad',
      TRANSLATED_TITLE: 'Breaking Bad',
      ID_CHANNEL: 10,
      LAUNCH_DATE: new Date('2008-01-20'),
      NUMBER_OF_EPISODES: 62,
      TYPICAL_DURATION: 47,
    });

    const launch2 = this.launchRepo.create({
      ID: 2,
      ID_PROGRAMME: 1,
      LOCAL_TITLE: 'Breaking Bad',
      TRANSLATED_TITLE: 'Breaking Bad - Rediffusion',
      ID_CHANNEL: 15,
      LAUNCH_DATE: new Date('2013-09-29'),
      NUMBER_OF_EPISODES: 62,
      TYPICAL_DURATION: 47,
    });

    // Créer des launches pour Game of Thrones
    const launch3 = this.launchRepo.create({
      ID: 3,
      ID_PROGRAMME: 2,
      LOCAL_TITLE: 'Game of Thrones',
      TRANSLATED_TITLE: 'Le Trône de Fer',
      ID_CHANNEL: 20,
      LAUNCH_DATE: new Date('2011-04-17'),
      NUMBER_OF_EPISODES: 73,
      TYPICAL_DURATION: 55,
    });

    await this.launchRepo.save([launch1, launch2, launch3]);

    return {
      message: 'Données de test insérées avec succès !',
      programmes: 3,
      launches: 3,
    };
  }
}
