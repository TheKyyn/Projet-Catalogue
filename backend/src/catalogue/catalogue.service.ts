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
  ) {} // ← IMPORTANT : Le constructeur se termine ici avec {}

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
    const results: { programme: Programme; launches: Launch[]}[] = []; // Typage du tableau results
    
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
}