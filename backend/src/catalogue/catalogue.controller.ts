import { Controller, Get, Query } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';

@Controller('catalogue') // définie le préfix de route, toutes les routes commenceront par /catalogue
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

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
}
