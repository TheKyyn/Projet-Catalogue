import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrNotaLaunch } from './entities/br-nota-launch.entity';
import { SimplyBroadcast } from './entities/simply-broadcast.entity';
import { SimplyProgramme } from './entities/simply-programme.entity';
import { SimplyChannel } from './entities/simply-channel.entity';
import { Broadcast } from './entities/broadcast.entity';
import { Region } from './entities/region.entity';
import { LocalDescriptionsNota } from './entities/local-descriptions-nota.entity';

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

    @InjectRepository(SimplyChannel, 'myetv')
    private simplyChannelRepo: Repository<SimplyChannel>,

    @InjectRepository(Broadcast, 'myetv')
    private broadcastRepo: Repository<Broadcast>,

    @InjectRepository(Region, 'myetv')
    private regionRepo: Repository<Region>,

    @InjectRepository(LocalDescriptionsNota, 'myetv')
    private localDescriptionsNotaRepo: Repository<LocalDescriptionsNota>,
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
   * Récupère la liste des pays disponibles pour les launches d'un programme
   * (sans charger tous les broadcasts pour optimiser)
   * @param launchIds - Liste des IDs de launches Nota
   * @returns Liste des noms de pays disponibles
   */
  async getAvailableCountries(launchIds: number[]): Promise<string[]> {
    if (launchIds.length === 0) {
      return [];
    }

    // 1. Chercher dans LOCAL_DESCRIPTIONS_NOTA pour trouver les broadcast IDs
    const localDescriptions = await this.localDescriptionsNotaRepo
      .createQueryBuilder('ldn')
      .where('ldn.NOTA_ID IN (:...ids)', { ids: launchIds })
      .getMany();

    if (localDescriptions.length === 0) {
      return [];
    }

    // 2. Extraire les broadcast IDs
    const broadcastIds = localDescriptions
      .map((ld) => ld.FIRST_APPEARANCE_BROADCAST_ID)
      .filter((id) => id !== null);

    if (broadcastIds.length === 0) {
      return [];
    }

    // 3. Récupérer les broadcasts pour obtenir les ID_REGION
    const broadcasts = await this.broadcastRepo
      .createQueryBuilder('b')
      .select('DISTINCT b.ID_REGION', 'ID_REGION')
      .where('b.ID_BROADCAST IN (:...ids)', { ids: broadcastIds })
      .andWhere('b.ID_REGION IS NOT NULL')
      .getRawMany();

    const regionIds = broadcasts.map((b: any) => b.ID_REGION as number);

    if (regionIds.length === 0) {
      return [];
    }

    // 4. Récupérer les noms des régions/pays
    const regions = await this.regionRepo
      .createQueryBuilder('r')
      .where('r.ID_REGION IN (:...ids)', { ids: regionIds })
      .getMany();

    // Retourner uniquement les noms des pays
    return regions.map((r) => r.NAME).filter((name) => name !== null);
  }

  /**
   * Récupère les broadcasts détaillés pour un pays spécifique
   * @param launchIds - Liste des IDs de launches Nota
   * @param countryName - Nom du pays (ex: "France")
   * @returns Broadcasts détaillés pour le pays
   */
  async getBroadcastsByCountry(
    launchIds: number[],
    countryName: string,
  ): Promise<Broadcast[]> {
    if (launchIds.length === 0) {
      return [];
    }

    // 1. Chercher dans LOCAL_DESCRIPTIONS_NOTA
    const localDescriptions = await this.localDescriptionsNotaRepo
      .createQueryBuilder('ldn')
      .where('ldn.NOTA_ID IN (:...ids)', { ids: launchIds })
      .getMany();

    if (localDescriptions.length === 0) {
      return [];
    }

    // 2. Extraire les broadcast IDs
    const broadcastIds = localDescriptions
      .map((ld) => ld.FIRST_APPEARANCE_BROADCAST_ID)
      .filter((id) => id !== null);

    if (broadcastIds.length === 0) {
      return [];
    }

    // 3. Trouver l'ID_REGION correspondant au pays
    const region = await this.regionRepo.findOne({
      where: { NAME: countryName },
    });

    if (!region) {
      return [];
    }

    // 4. Récupérer les broadcasts pour ce pays
    const broadcasts = await this.broadcastRepo
      .createQueryBuilder('b')
      .where('b.ID_BROADCAST IN (:...ids)', { ids: broadcastIds })
      .andWhere('b.ID_REGION = :regionId', { regionId: region.ID_REGION })
      .getMany();

    return broadcasts;
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
        // Pour chaque programme Simply, récupérer ses broadcasts avec le nom de la chaîne
        for (const prog of programmes) {
          const broadcasts = await this.simplyBroadcastRepo
            .createQueryBuilder('b')
            .leftJoinAndMapOne(
              'b.channel',
              SimplyChannel,
              'c',
              'b.ID_SIMPLY_CHANNEL = c.ID_SIMPLY',
            )
            .where('b.ID_SIMPLY_PROGRAMME = :progId', {
              progId: prog.ID_SIMPLY,
            })
            .getMany();

          // Récupérer la chaîne du premier broadcast (si existe)
          const firstChannel = broadcasts.length > 0 ? broadcasts[0]['channel'] : null;

          // Ajouter les infos de chaîne au programme
          const enrichedProgramme = {
            ...prog,
            CHANNEL_NAME: firstChannel?.NAME || null,
            CHANNEL_COUNTRY: firstChannel?.COUNTRY_CODE || null,
            ID_SIMPLY_CHANNEL: broadcasts.length > 0 ? broadcasts[0].ID_SIMPLY_CHANNEL : null,
          };

          simplyData.programmes.push(enrichedProgramme);

          // Ajouter le nom de la chaîne dans chaque broadcast
          const enrichedBroadcasts = broadcasts.map((broadcast) => ({
            ...broadcast,
            CHANNEL_NAME: broadcast['channel']?.NAME || null,
            CHANNEL_COUNTRY: broadcast['channel']?.COUNTRY_CODE || null,
            CHANNEL_NAME_MYETV: broadcast['channel']?.NAME_MYETV || null,
          }));

          simplyData.broadcasts.push(...enrichedBroadcasts);
        }
      }
    }

    return simplyData.programmes.length > 0 ? simplyData : null;
  }
}
