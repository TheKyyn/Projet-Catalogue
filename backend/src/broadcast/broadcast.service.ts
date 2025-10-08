import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrNotaLaunch } from './entities/br-nota-launch.entity';
import { SimplyBroadcast } from './entities/simply-broadcast.entity';
import { SimplyProgramme } from './entities/simply-programme.entity';
import { Broadcast } from './entities/broadcast.entity';
import { Region } from './entities/region.entity';

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

    @InjectRepository(Broadcast, 'myetv')
    private broadcastRepo: Repository<Broadcast>,

    @InjectRepository(Region, 'myetv')
    private regionRepo: Repository<Region>,
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
   * Récupère les broadcasts MyETV pour les launches d'un programme,
   * groupés par région/pays
   * @param launchIds - Liste des IDs de launches
   * @returns Broadcasts groupés par région
   */
  async getBroadcastsByLaunches(launchIds: number[]) {
    if (launchIds.length === 0) {
      return { broadcastsByRegion: {}, simply: null };
    }

    // Hypothèse: ID_LOCAL_DESCRIPTION dans BROADCASTS correspond aux Launch IDs
    // On cherche les broadcasts dont ID_LOCAL_DESCRIPTION est dans la liste des launches
    const broadcasts = await this.broadcastRepo
      .createQueryBuilder('b')
      .where('b.ID_LOCAL_DESCRIPTION IN (:...ids)', { ids: launchIds })
      .getMany();

    // Récupérer toutes les régions concernées
    const regionIds = [...new Set(broadcasts.map((b) => b.ID_REGION))].filter(
      (id) => id !== null,
    );

    const regions = await this.regionRepo.findByIds(regionIds);

    // Créer un map région ID -> région
    const regionMap: { [key: number]: Region } = {};
    regions.forEach((r) => {
      regionMap[r.ID_REGION] = r;
    });

    // Grouper les broadcasts par région
    const broadcastsByRegion: {
      [regionName: string]: { region: Region; broadcasts: Broadcast[] };
    } = {};

    broadcasts.forEach((broadcast) => {
      if (broadcast.ID_REGION) {
        const region = regionMap[broadcast.ID_REGION];
        const regionName = region
          ? region.NAME
          : `Region ${broadcast.ID_REGION}`;

        if (!broadcastsByRegion[regionName]) {
          broadcastsByRegion[regionName] = {
            region: region,
            broadcasts: [],
          };
        }

        broadcastsByRegion[regionName].broadcasts.push(broadcast);
      }
    });

    return { broadcastsByRegion };
  }

  /**
   * Récupère les données Simply d'un programme Nota
   * @param externalIds - Liste des external IDs du programme
   * @returns Données Simply (programme + broadcasts)
   */
  async getSimplyDataByExternalIds(
    externalIds: Array<{ ID_NAME: number; VALUE: string }>,
  ) {
    // Chercher l'ID Simply dans les external IDs
    // Hypothèse: ID_NAME a une valeur spécifique pour Simply (à ajuster selon votre config)
    // Pour l'instant, on cherche tous les IDs pour trouver Simply
    const simplyData: {
      programmes: any[];
      broadcasts: any[];
    } = {
      programmes: [],
      broadcasts: [],
    };

    for (const extId of externalIds) {
      // Chercher dans SIMPLY_PROGRAMME
      const programmes = await this.simplyProgrammeRepo.find({
        where: { ID_SIMPLY: extId.VALUE },
      });

      if (programmes.length > 0) {
        simplyData.programmes.push(...programmes);

        // Pour chaque programme Simply, récupérer ses broadcasts
        for (const prog of programmes) {
          const broadcasts = await this.simplyBroadcastRepo.find({
            where: { ID_SIMPLY_PROGRAMME: prog.ID_SIMPLY },
          });
          simplyData.broadcasts.push(...broadcasts);
        }
      }
    }

    return simplyData.programmes.length > 0 ? simplyData : null;
  }
}
