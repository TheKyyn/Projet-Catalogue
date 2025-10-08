import { Controller, Get, Query, Param } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { BroadcastService } from '../broadcast/broadcast.service';

@Controller('catalogue') // définie le préfix de route, toutes les routes commenceront par /catalogue
export class CatalogueController {
  constructor(
    private readonly catalogueService: CatalogueService,
    private readonly broadcastService: BroadcastService,
  ) {}

  @Get('search') // donc, /catalogue/search
  // récupère la valeur du paramètre, ici 'title'
  async search(@Query('title') title: string) {
    // verifie que le paramètre est fourni (ici, title)
    if (!title) {
      return {
        error: 'Le paramètre title est requis',
        exemple: '/catalogue/search?title=Breaking',
      };
    }

    // Appel le service pr effectuer la recherche
    const results = await this.catalogueService.searchByTitle(title);

    return {
      query: title,
      count: results.length,
      results: results,
    };
  }

  @Get('seed')
  async seed() {
    const result = await this.catalogueService.seedTestData();
    return result;
  }

  /**
   * Endpoint pour récupérer tous les détails d'un programme
   * Route : GET /catalogue/programme/:id
   * @param id - L'ID du programme Nota
   * @returns Toutes les infos : programme, launches, broadcasts par région, données Simply
   */
  @Get('programme/:id')
  async getProgrammeDetails(@Param('id') id: string) {
    // Convertir l'ID en nombre
    const programmeId = parseInt(id, 10);

    if (isNaN(programmeId)) {
      return {
        error: "L'ID du programme doit être un nombre",
        exemple: '/catalogue/programme/1',
      };
    }

    // 1. Récupérer les infos de base du programme (Nota)
    const programmeData =
      await this.catalogueService.getProgrammeDetails(programmeId);

    if ('error' in programmeData) {
      return programmeData; // Programme non trouvé
    }

    // 2. Récupérer la LISTE des pays disponibles (sans charger les broadcasts)
    const launchIds = programmeData.launches.map((l) => l.ID);
    const availableCountries =
      await this.broadcastService.getAvailableCountries(launchIds);

    // 3. Récupérer les données Simply via les external IDs
    const simplyData = await this.broadcastService.getSimplyDataByExternalIds(
      programmeData.externalIds,
    );

    // 4. Retourner tout (sans les broadcasts détaillés)
    return {
      programme: programmeData.programme,
      launches: programmeData.launches,
      availableCountries: availableCountries,
      simply: simplyData,
    };
  }

  /**
   * Endpoint pour récupérer les broadcasts d'un pays spécifique
   * Route : GET /catalogue/programme/:id/broadcasts?country=France
   * @param id - L'ID du programme Nota
   * @param country - Le nom du pays
   * @returns Broadcasts détaillés pour ce pays
   */
  @Get('programme/:id/broadcasts')
  async getProgrammeBroadcastsByCountry(
    @Param('id') id: string,
    @Query('country') country: string,
  ) {
    // Validation des paramètres
    const programmeId = parseInt(id, 10);

    if (isNaN(programmeId)) {
      return {
        error: "L'ID du programme doit être un nombre",
        exemple: '/catalogue/programme/1/broadcasts?country=France',
      };
    }

    if (!country) {
      return {
        error: 'Le paramètre "country" est requis',
        exemple: '/catalogue/programme/1/broadcasts?country=France',
      };
    }

    // 1. Récupérer les launches du programme
    const programmeData =
      await this.catalogueService.getProgrammeDetails(programmeId);

    if ('error' in programmeData) {
      return programmeData; // Programme non trouvé
    }

    // 2. Récupérer les broadcasts pour le pays demandé
    const launchIds = programmeData.launches.map((l) => l.ID);
    const broadcasts = await this.broadcastService.getBroadcastsByCountry(
      launchIds,
      country,
    );

    // 3. Retourner les broadcasts
    return {
      programmeId: programmeId,
      country: country,
      count: broadcasts.length,
      broadcasts: broadcasts,
    };
  }
}
